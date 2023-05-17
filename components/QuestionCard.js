import React, { useEffect, useState } from "react";
import { Card, Progress, Row, Col } from "antd";
import { Slider } from "antd";
import "./card.css";

const marks = {
  0: "SD",
  25: "D",
  50: "N",
  75: "A",
  100: "SA",
};
const questions = [
  "I have ambitious aims of making a difference.",
  "My leadership journey has progressed as I anticipated.",
  "I have spent fewer than 4 years in full time service or ministry.",
];

export default function QuestionCard() {
  const [progress, setProgress] = useState({
    progress: 0,
    bar: 0,
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [isCompleted, setIsCompleted] = useState(false);
  const increaseProgress = () => {
    console.log("increase progress");

    if (progress.progress === 1) {
      setProgress((prevProgress) => ({
        ...prevProgress,
        progress: 0,
        bar: prevProgress.bar + 1,
      }));
    }
    setProgress((prevProgress) => ({
      ...prevProgress,
      progress: prevProgress.progress + 0.25,
    }));
  };
  const calculateProgress = (id) => {
    if (progress.bar === id) return progress.progress * 100;
    if (progress.bar > id) return 100;
    return 0;
  };
  useEffect(() => {
    if (answers[answers.length - 1] !== "") setIsCompleted(true);
    else setIsCompleted(false);
  }, [currentQuestion, answers]);
  const handleAnswerChange = (value) => {
    console.log(value);
    if (isCompleted) return;
    if (answers[currentQuestion] !== "") return;
    let temp = answers;
    temp = temp.map((e, i) => {
      if (i === currentQuestion) return value;
      return e;
    });
    setAnswers(temp);
    increaseProgress();
    if (currentQuestion !== questions.length - 1)
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1500);
  };
  const handleNext = () => {
    if (isCompleted) return;
    if (answers[currentQuestion] !== null)
      setCurrentQuestion(currentQuestion + 1);
  };
  const handlePrevious = () => {
    if (currentQuestion !== 0) setCurrentQuestion(currentQuestion - 1);
  };
  console.log(isCompleted);

  return (
    <>
      <div className="outside">
        <Card className="first-card">
          <div className="heading">
            <h1>Are You Disillusioned?</h1>
          </div>
        </Card>
        <Card bordered={true} style={{ width: "90%", maxWidth: "900px", margin: "0 auto" }} className="second-card">
          <Row gutter={10}>
            <Col sm={6} xs={12}>
              <Progress percent={calculateProgress(0)} showInfo={false} />
              <p>IDEALISTIC</p>
            </Col>
            <Col sm={6} xs={12}>
              <Progress percent={calculateProgress(1)} showInfo={false} />
              <p>DISILLUSIONED</p>
            </Col>{" "}
            <Col sm={6} xs={12}>
              <Progress percent={calculateProgress(2)} showInfo={false} />
              <p>CYNICAL</p>
            </Col>
            <Col sm={6} xs={12}>
              <Progress percent={calculateProgress(3)} showInfo={false} />
              <p>HOPEFUL</p>
            </Col>
          </Row>
          <div className="question-margin">
            <h2>{`${currentQuestion + 1}/${questions.length}`}</h2>
            <p>{questions[currentQuestion]}</p>
          </div>
          <Slider
            value={answers[currentQuestion]}
            marks={marks}
            step={null}
            defaultValue={null}
            onChange={(value) => handleAnswerChange(value)}
          />
          <Row justify="space-between">
            <Col style={{ cursor: "pointer" }} onClick={handlePrevious}>
              <button><span>👈</span> Prev </button>
            </Col>
            <Col style={{ cursor: "pointer" }} onClick={handleNext}>
              <button>Next <span>👉</span></button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
