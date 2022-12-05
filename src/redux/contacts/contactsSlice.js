import { createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  fetchContacts,
  fetchNewContacts,
} from "./contactsOperations";

const initialState = {
  contacts: [],
  loading: false,
  hasMore: true,
  limit: 5,
  page: 2,
};
export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: {
    [fetchNewContacts.pending](state) {
      state.loading = true;
    },
    [fetchNewContacts.fulfilled](state, { payload }) {
      state.loading = false;
      state.limit = state.limit + 5;
      const newContacts = payload.filter(
        (contact) => contact.id !== state.contacts.id
      );
      state.contacts = [...state, newContacts];
    },
    [fetchNewContacts.rejected](state) {
      state.loading = false;
    },
    [fetchContacts.pending](state) {
      state.loading = true;
    },
    [fetchContacts.fulfilled](state, { payload }) {
      state.loading = false;
      // state.contacts = payload;
      state.contacts = [...state.contacts, ...payload];
    },
    [fetchContacts.rejected](state) {
      state.loading = false;
    },
    [addContact.pending](state) {
      state.loading = true;
    },
    [addContact.fulfilled](state, { payload }) {
      state.contacts = [...state.contacts, payload];
      state.loading = false;
    },
    [addContact.rejected](state) {
      state.loading = false;
    },
    [deleteContact.pending](state) {
      state.loading = true;
    },
    [deleteContact.fulfilled](state, { payload }) {
      state.contacts = state.contacts.filter(({ id }) => id !== payload);
      state.loading = false;
    },
    [deleteContact.rejected](state) {
      state.loading = false;
    },
  },
});

export default contactsSlice.reducer;
