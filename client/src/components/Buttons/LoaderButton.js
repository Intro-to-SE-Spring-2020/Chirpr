import React from "react";
import { Button } from "react-bootstrap";
import "./LoaderButton.css";

const LoaderButton = ({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
      {props.children}
    </Button>
  );
}