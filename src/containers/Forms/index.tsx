import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchForm,
  saveUpdatedForm,
  formActions,
} from "../../store/reducers/formReducer";
import type { RootState, AppDispatch } from "../../store";
import { Grid, Button, Box, CircularProgress } from "@mui/material";

import Field from "../../components/Field";
import MUICard from "../../components/MUICard";

const Forms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const forms: Definitions.IField[] | undefined = useSelector(
    (state: RootState) => state.FormReducer.form
  );

  const lists: Definitions.ICrudObj | undefined = useSelector(
    (state: RootState) => state.FormReducer.list
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.FormReducer.loading
  );

  const isSavingForm: boolean = useSelector(
    (state: RootState) => state.FormReducer.isSavingForm
  );

  const [initLoad, setInitLoad] = useState<boolean>(true);

  useEffect(() => {
    if (initLoad) {
      dispatch(fetchForm());
      setInitLoad(false);
    }
  }, [initLoad, dispatch]);

  const editHandler = (keyName: string, text: string) => {
    const updatedForm = forms?.map((form) => {
      if (form.fieldName === keyName) {
        return {
          ...form,
          value: text,
        };
      }
      return form;
    });
    dispatch(formActions.updateForm(updatedForm));
  };

  const saveHandler = () => {
    if (forms) {
      const object: Definitions.ICrudObj = forms.reduce(
        (previousValue, currentValue) => {
          return {
            ...previousValue,
            [currentValue.fieldName]: currentValue.value,
          };
        },
        {}
      );
      dispatch(saveUpdatedForm(object));
    }
  };

  const isMultiLines = (fieldName: string) => {
    return (
      forms &&
      forms.some(
        (val) => val.fieldName === fieldName && val.type === "multiline"
      )
    );
  };

  const getComponents = () => {
    const listsArray = Object.entries(lists ? lists : {});
    switch (true) {
      case loading:
        return (
          <Box
            sx={{
              display: "flex",
              height: "30vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        );
      case lists !== undefined:
        return (
          <MUICard
            onClose={() => {
              dispatch(formActions.resetList());
            }}
            data={[
              {
                title: `${lists?.firstName} ${lists?.lastName}`,
                subtitle: `${lists?.emailAddress}`,
                multiline: lists
                  ? listsArray
                      .filter((el) => isMultiLines(el[0]))
                      .map((val) => {
                        return {
                          title: val[0],
                          text: val[1],
                        };
                      })
                  : [],
                content: lists
                  ? listsArray
                      .filter(
                        (el) =>
                          ["firstName", "lastName", "emailAddress"].indexOf(
                            el[0]
                          ) === -1 && (forms ? !isMultiLines(el[0]) : true)
                      )
                      .map((el) => {
                        return {
                          title: el[0],
                          text: el[1],
                        };
                      })
                  : [],
              },
            ]}
          />
        );
      case !!forms:
        return (
          <>
            <Field
              data={forms ? forms : []}
              onChange={(fieldName, text) => editHandler(fieldName, text)}
            />
            <Button
              variant="contained"
              style={{ margin: "0 8px", color: "white" }}
              onClick={() => saveHandler()}
            >
              {isSavingForm ? <CircularProgress color={"inherit"} /> : "Save"}
            </Button>
          </>
        );
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ padding: 20 }}
    >
      <div
        style={{
          width: 450,
          minHeight: "30vh",
          borderRadius: 10,
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          padding: 10,
        }}
      >
        {getComponents()}
      </div>
    </Grid>
  );
};

export default Forms;
