// SubjectCard.js

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const NotesCard = ({ subject, imageSrc, onDownload, onOpen }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>{subject}</Card.Header>
      <Card.Body>
        <img src={imageSrc} alt={subject} className="card-img" />
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onClick={onDownload}>
          Download
        </Button>
        <Button variant="success" onClick={onOpen}>
          Open
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default NotesCard;

