import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton, styled, TableHead } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Link } from 'react-router-dom';
import "../assets/css/problemset.css";
import { difficultyMap } from "../assets/static/problems";
import { languages } from "../assets/static/language";
import { timestampFormatter } from "../utils/DateFormatter";
import AdjustIcon from '@mui/icons-material/Adjust';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import "../assets/css/submissiontable.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

type SubmissionTableProps = {
  submissions: any,
  isLoading: boolean,
}

const SubmissionTable = ({ submissions, isLoading }: SubmissionTableProps) => {

  const resultStatusDOM = (result: string) => {
    switch (result) {
      case "Optimal": {
        return (
          <div className="optimal-status-dom">
            <DoneIcon/><span>Optimal</span>
          </div>
        )
      }
      case "Sub-Optimal": {
        return (
          <div className="sub-optimal-status-dom">
            <AccessTimeIcon/><span>Sub-Optimal</span>
          </div>
        )
      }
      default: {
        return (
          <div className="not-complete-status-dom">
            <CloseIcon/><span>Not Completed</span>
          </div>
        )
      }
    }
  }

  const problemTableRowsDOM = (isLoading: boolean) => {
    if (isLoading) {
      return submissions.map((submission, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton/></TableCell>
          <TableCell><Skeleton /></TableCell>
          <TableCell component="th" scope="row">
            <Skeleton />
          </TableCell>
          {/*<TableCell><Skeleton /></TableCell>*/}
          <TableCell style={{ width: 160 }} align="right">
            <Skeleton />
          </TableCell>
        </TableRow>
      ))
    } else {
      return (
        submissions.map(submission => (
          <TableRow key={submission.id}>
            <TableCell>{resultStatusDOM(submission.result)}</TableCell>
            <TableCell>
              <Link to={`/problem/${submission.problemId}`}>{`#${submission.problemId}. ${submission.problemTitle}`}</Link>
            </TableCell>
            <TableCell component="th" scope="row">
              <Link to={`/submission/${submission.submissionId}`}>{languages.get(submission.language)}</Link>
            </TableCell>
            {/*<TableCell style={{ width: 120 }}>*/}
            {/*  <span className={`Hard`}>{"Easy"}</span>*/}
            {/*</TableCell>*/}
            <TableCell>{timestampFormatter(submission.timeSubmitted)}</TableCell>
          </TableRow>
        ))
      )
    }
  }

  return (
    <>
      <TableContainer sx={{ minWidth: 960, maxWidth: 960 }} component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: '17%', fontWeight: 'bold', fontSize: '16px' }}>Status</StyledTableCell>
              {/*<StyledTableCell style={{ width: '7%', fontWeight: 'bold', fontSize: '16px' }}>Problem</StyledTableCell>*/}
              <StyledTableCell style={{ width: '50%', fontWeight: 'bold', fontSize: '16px' }}>Problem</StyledTableCell>
              <StyledTableCell style={{ width: '13%', fontWeight: 'bold', fontSize: '16px' }}>Language</StyledTableCell>
              {/*<StyledTableCell style={{ width: '7%', fontWeight: 'bold', fontSize: '16px' }}>Code</StyledTableCell>*/}
              <StyledTableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Submit Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { problemTableRowsDOM(isLoading) }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SubmissionTable;
