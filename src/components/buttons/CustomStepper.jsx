import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

// Custom Connector with new color gradient
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#7950f2 0%, #9e78ff 50%, #b79aff 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#7950f2 0%, #9e78ff 50%, #b79aff 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

// Custom Step Icon with new color gradient
const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed ? "#4caf50" : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #7950f2 0%, #9e78ff 50%, #b79aff 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, icon } = props;

  const icons = {
    1: <PersonAddAlt1Icon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <CustomStepIconRoot ownerState={{ completed, active }}>
      {completed ? <Check /> : icons[String(icon)]}
    </CustomStepIconRoot>
  );
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ["Add Teachers", "Add Students", "Review & Finish"];

export default function CustomStepper({ activeStep }) {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<CustomConnector />}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

CustomStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};
