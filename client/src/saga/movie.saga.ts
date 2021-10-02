import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { GetDetailPayload } from "types/shared/get-detail.type";
import movieApi from "../service/movie.service";
import {
    booking,
    bookingSuccess,
    getMovieByLanguage,
    getMovieByLanguageFailure,
    getMovieByLanguageSuccess,
    getMovieDetailAction,
    getMovieDetailActionSuccess,
    getMovieDetailFailure,
    getPaginateMoviesAction,
    getPaginateMoviesActionFailure,
    getPaginateMoviesActionSucess,
    getShowtime,
    getShowtimeFailure,
    getShowtimeSuccess,
} from "../store/features/movie.slice";
import { BookingPayload, MovieWithLanguagePayload, PaginationRequestType } from "../types/movie.type";

function* onGetDataPagination({ payload }: PayloadAction<PaginationRequestType>) {
    try {
        const { response, error } = yield call(movieApi.getMoviePagination, payload);
        yield delay(500);
        if (error) throw new Error(error.message);

        yield put(getPaginateMoviesActionSucess(response.data));
    } catch (error: any) {
        console.log("error", error.message);
        yield put(getPaginateMoviesActionFailure(error.message));
    }
}

function* onGetMovieDetail({ payload }: PayloadAction<GetDetailPayload>) {
    try {
        const { response, error } = yield call(movieApi.getMovieDetail, payload);
        if (error) throw new Error(error.message);

        yield put(getMovieDetailActionSuccess(response.data));
    } catch (error: any) {
        yield put(getMovieDetailFailure(error.message));
    }
}

function* onGetMovieByLanguage({ payload }: PayloadAction<MovieWithLanguagePayload>) {
    try {
        const { response, error } = yield call(movieApi.getMovieByLanguage, payload);
        if (error) throw new Error(error.message);

        yield put(getMovieByLanguageSuccess(response.data));
    } catch (error: any) {
        yield put(getMovieByLanguageFailure(error.message));
    }
}

function* onGetShowtime({ payload }: PayloadAction<GetDetailPayload>) {
    try {
        const { response, error } = yield call(movieApi.getShowtime, payload);
        if (error) throw new Error(error.message);

        yield put(getShowtimeSuccess(response.data));
    } catch (error: any) {
        yield put(getShowtimeFailure(error.message));
    }
}

function* onBooking({ payload }: PayloadAction<BookingPayload>) {
    try {
        const { response, error } = yield call(movieApi.booking, payload);
        if (error) throw new Error(error.message);

        yield put(bookingSuccess(response.data));
    } catch (error: any) {
        yield put(getShowtimeFailure(error.message));
    }
}

function* watchOnLyrics() {
    yield takeLatest(getPaginateMoviesAction.type, onGetDataPagination);
    yield takeLatest(getMovieDetailAction.type, onGetMovieDetail);
    yield takeLatest(getMovieByLanguage.type, onGetMovieByLanguage);
    yield takeLatest(getShowtime.type, onGetShowtime);
    yield takeLatest(booking.type, onBooking);
}

function* movieSaga() {
    yield all([fork(watchOnLyrics)]);
}

export default movieSaga;