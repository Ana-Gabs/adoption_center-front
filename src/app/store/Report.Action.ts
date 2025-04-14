import { createAction, props } from '@ngrx/store';
import { Report } from '../models/report';

// Constants
export const LOAD_REPORTS = '[Report] getAll';
export const LOAD_REPORTS_SUCCESS = '[Report] getAll Success';
export const LOAD_REPORTS_FAILURE = '[Report] getAll Failure';

export const DELETE_REPORT = '[Report] Delete';
export const DELETE_REPORT_SUCCESS = '[Report] Delete Success';
export const DELETE_REPORT_FAILURE = '[Report] Delete Failure';

export const ADD_REPORT = '[Report] Add';
export const ADD_REPORT_SUCCESS = '[Report] Add Success';
export const ADD_REPORT_FAILURE = '[Report] Add Failure';

export const UPDATE_REPORT = '[Report] Update';
export const UPDATE_REPORT_SUCCESS = '[Report] Update Success';
export const UPDATE_REPORT_FAILURE = '[Report] Update Failure';

export const GET_REPORT = '[Report] getOne';
export const GET_REPORT_SUCCESS = '[Report] getOne Success';
export const GET_REPORT_FAILURE = '[Report] getOne Failure';

export const EMPTY_REPORT_ACTION = '[Report] Empty';

// Actions
export const loadReports = createAction(LOAD_REPORTS);
export const loadReportsSuccess = createAction(
  LOAD_REPORTS_SUCCESS,
  props<{ list: Report[] }>()
);
export const loadReportsFailure = createAction(
  LOAD_REPORTS_FAILURE,
  props<{ errMsg: string }>()
);

export const deleteReport = createAction(
  DELETE_REPORT,
  props<{ reportId: number }>()
);
export const deleteReportSuccess = createAction(
  DELETE_REPORT_SUCCESS,
  props<{ reportId: number }>()
);
export const deleteReportFailure = createAction(
  DELETE_REPORT_FAILURE,
  props<{ errMsg: string }>()
);

export const addReport = createAction(
  ADD_REPORT,
  props<{ data: Report }>()
);
export const addReportSuccess = createAction(
  ADD_REPORT_SUCCESS,
  props<{ data: Report }>()
);
export const addReportFailure = createAction(
  ADD_REPORT_FAILURE,
  props<{ errMsg: string }>()
);

export const updateReport = createAction(
  UPDATE_REPORT,
  props<{ data: Report }>()
);
export const updateReportSuccess = createAction(
  UPDATE_REPORT_SUCCESS,
  props<{ data: Report }>()
);
export const updateReportFailure = createAction(
  UPDATE_REPORT_FAILURE,
  props<{ errMsg: string }>()
);

export const getReport = createAction(
  GET_REPORT,
  props<{ reportId: number }>()
);

export const emptyReportAction = createAction(EMPTY_REPORT_ACTION);
