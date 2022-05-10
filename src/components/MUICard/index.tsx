import React from "react";
import {
  IconButton,
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface IProps {
  data: {
    title: string;
    subtitle: string;
    multiline: { title: string; text: string }[];
    content: { title: string; text: string }[];
  }[];
  onClose: () => void;
}

const MUICard = (props: IProps) => {
  const { data, onClose } = props;

  return (
    <>
      {data.map((el, index) => {
        return (
          <Card
            sx={{
              maxWidth: 345,
              alignSelf: "center",
              marginTop: "8%",
              marginBottom: 5,
            }}
          >
            <CardHeader
              avatar={<Avatar aria-label="person">R</Avatar>}
              action={
                <IconButton onClick={() => onClose()} aria-label="close">
                  {<CloseIcon />}
                </IconButton>
              }
              title={el.title}
              subheader={el.subtitle}
            />
            <CardContent>
              {el.multiline.map((value, index) => (
                <div key={`card-multiline-${index}`}>
                  <Typography gutterBottom variant="h6" component="div">
                    {value.title}
                  </Typography>
                  <Typography paragraph>{value.text}</Typography>
                </div>
              ))}
              <Stack
                direction={"row"}
                spacing={0.5}
                flexWrap={"wrap"}
                alignItems="center"
              >
                {el.content.map((value, index) => {
                  return (
                    <Chip
                      key={value.title}
                      label={
                        <>
                          <Typography
                            sx={{
                              display: "inline",
                              fontWeight: "bold",
                              marginRight: 0.5,
                            }}
                            component="span"
                            variant="body2"
                          >
                            {`${value.title}:`}
                          </Typography>
                          <span>{value.text}</span>
                        </>
                      }
                      color={index % 2 === 0 ? "primary" : "success"}
                      variant="outlined"
                    />
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default MUICard;
