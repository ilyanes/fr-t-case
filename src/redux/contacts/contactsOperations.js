import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { numberPage } from "./contactsSelectors";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async (page) => {
  fetchContacts.pending();
  try {
    const { data } = await axios.get(`http://localhost:4000/contacts?_limit=5`);
    return data;
  } catch (error) {
    fetchContacts.rejected(error);
  }
});

export const fetchNewContacts = createAsyncThunk("contacts/fetchNewContacts", async () => {
  const userPage = useSelector(numberPage);
  fetchNewContacts.pending();
  try {
    const { data } = await axios.get(`http://localhost:4000/contacts?_page=${userPage}&_limit=5`);
    return data;
  } catch (error) {
    fetchNewContacts.rejected(error);
  }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact) => {
  addContact.pending();
  try {
    const { data } = await axios.post("http://localhost:4000/contacts", contact);
    return data;
  } catch (error) {
    addContact.rejected(error);
  }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => {
  deleteContact.pending();
  try {
    await axios.delete(`http://localhost:4000/contacts/${id}`);
    return id;
  } catch (error) {
    deleteContact.rejected(error);
  }
});
