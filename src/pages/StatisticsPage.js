import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosHandler";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { getReadableDate } from "../utils/Utils";

const StatisticsPage = () => {
  const [isData, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/api/rounds/statistics/`);
      setData(response.data);
    };
    fetchData();
  }, []);

  const getBestRounds = () => {
    const currentUser = isData.user;
    const result = [];
    isData.rounds.forEach((round) => {
      const userIndex = round.players.indexOf(currentUser);
      const courseExists = result.find(
        (bestRound) => bestRound.course === round.course.name
      );
      if (courseExists) {
        const currentResult = courseExists.score;
        if (currentResult >= round.scores[userIndex]) {
          courseExists.score = round.scores[userIndex];
          courseExists.date = round.date;
        }
      } else {
        result.push({
          course: round.course.name,
          score: round.scores[userIndex],
          date: round.date,
        });
      }
    });
    return result;
  };

  return (
    <React.Fragment>
      <Header />
      <Typography variant="h5" component="p" align="center" color="secondary">
        Best results
      </Typography>
      {isData ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Course</b>
              </TableCell>
              <TableCell align="center">
                <b>Score</b>
              </TableCell>
              <TableCell align="center">
                <b>Date</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getBestRounds().map((round, index) => {
              return (
                <TableRow key={index * 0.23526}>
                  <TableCell align="center">{round.course}</TableCell>
                  <TableCell align="center">
                    {round.score > 0 ? "+" + round.score : round.score}
                  </TableCell>
                  <TableCell align="center">
                    {getReadableDate(round.date)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : null}
      <Navbar />
    </React.Fragment>
  );
};

export default StatisticsPage;
