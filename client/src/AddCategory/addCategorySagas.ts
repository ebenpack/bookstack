import { put, call, select, takeEvery } from "redux-saga/effects";

import { axiosCall, getCredentials } from "../utils/sagasUtils";
import {
    addCategorySuccess,
    addCategoryFailure,
    searchCategorySuccess,
    searchCategoryFailure,
    AddCategoryRequestAction,
    SearchCategoryRequestAction,
    ADD_CATEGORY_ADD_REQUEST,
    ADD_CATEGORY_SEARCH_REQUEST,
} from "./addCategoryModule";
import { List } from "immutable";
import {
    CategoryDetailParams,
    CategoryDetailRecord,
} from "../Category/categoryModule";

export function* addCategory({ category }: AddCategoryRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: "POST",
            url: `${apiUrl}/api/category/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            data: {
                category,
            },
        });
        yield put(addCategorySuccess(data));
    } catch (err) {
        const error =
            err && err.response && err.response.data
                ? err.response.data
                : { error: "Add category request failed" };
        yield put(addCategoryFailure(error));
    }
}

export function* setAutoSuggestCategories({
    query,
}: SearchCategoryRequestAction) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: "GET",
            url: `${apiUrl}/api/category/?search=${query}`,
        });
        const categories: List<CategoryDetailRecord> = List(
            data.map(
                (category: CategoryDetailParams) =>
                    new CategoryDetailRecord(category)
            )
        );
        yield put(searchCategorySuccess(categories));
    } catch (err) {
        const error =
            err && err.response && err.response.data
                ? err.response.data
                : { error: "Category search request failed" };
        yield put(searchCategoryFailure(error));
    }
}

export function* watchAddCategory() {
    yield takeEvery(ADD_CATEGORY_ADD_REQUEST, addCategory);
}

export function* watchSetAutoSuggestCategories() {
    yield takeEvery(ADD_CATEGORY_SEARCH_REQUEST, setAutoSuggestCategories);
}

export default [watchAddCategory, watchSetAutoSuggestCategories];
