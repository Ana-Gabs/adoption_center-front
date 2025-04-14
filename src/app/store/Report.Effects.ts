import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { ReportService } from '../services/report.service';
import {
  loadReports,
  loadReportsSuccess,
  loadReportsFailure,
  deleteReport,
  deleteReportSuccess,
  deleteReportFailure,
  addReport,
  addReportSuccess,
  addReportFailure,
  updateReport,
  updateReportSuccess,
  updateReportFailure,
  emptyReportAction
} from './Report.Action';

import { catchError, map, switchMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ReportEffects {
  actions$ = inject(Actions);
  service = inject(ReportService);
  toastr = inject(ToastrService);

  loadReports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReports),
      exhaustMap(() =>
        this.service.getAll().pipe(
          map((res: any) => {
            console.log('Respuesta desde el servicio:', res);
            if (Array.isArray(res)) {
              return loadReportsSuccess({ list: res });
            }
            if (res && res.datos) {
              return loadReportsSuccess({ list: res.datos });
            }
            console.error('Error: respuesta del servicio no contiene "datos".');
            return loadReportsFailure({ errMsg: 'No se encontraron reportes' });
          }),
          catchError((err) => {
            console.error('Error cargando reportes:', err);
            return of(loadReportsFailure({ errMsg: err.message }));
          })
        )
      )
    )
  );

  deleteReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteReport),
      switchMap((action) =>
        this.service.delete(action.reportId).pipe(
          map(() => {
            this.showAlert('Reporte eliminado correctamente', 'pass');
            return deleteReportSuccess({ reportId: action.reportId });
          }),
          catchError((err) => {
            this.showAlert(err.message, 'fail');
            return of(deleteReportFailure({ errMsg: err.message }));
          })
        )
      )
    )
  );

  addReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReport),
      switchMap((action) =>
        this.service.create(action.data).pipe(
          switchMap(() =>
            of(
              addReportSuccess({ data: action.data }),
              this.showAlert('Reporte creado correctamente', 'pass')
            )
          ),
          catchError((err) =>
            of(
              this.showAlert(err.message, 'fail'),
              addReportFailure({ errMsg: err.message })
            )
          )
        )
      )
    )
  );

  updateReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateReport),
      switchMap((action) =>
        this.service.update(action.data.id, action.data).pipe(
          switchMap(() =>
            of(
              updateReportSuccess({ data: action.data }),
              this.showAlert('Reporte actualizado correctamente', 'pass')
            )
          ),
          catchError((err) =>
            of(
              this.showAlert(err.message, 'fail'),
              updateReportFailure({ errMsg: err.message })
            )
          )
        )
      )
    )
  );

  showAlert(message: string, response: string) {
    response === 'pass'
      ? this.toastr.success(message)
      : this.toastr.error(message);
    return emptyReportAction();
  }
}