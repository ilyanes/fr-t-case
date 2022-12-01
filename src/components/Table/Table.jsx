import { useSelector, useDispatch } from "react-redux";
import { getContacts, isLoading } from "../../redux/contacts/contactsSelectors";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  deleteContact,
  fetchContacts,
  fetchNewContacts,
} from "../../redux/contacts/contactsOperations";

import styles from "./Table.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Loader from "../Loader/Loader";
import EndMsg from "../EndMsg/EndMsg";

const tableHeaders = [
  "№",
  "Name",
  "Age",
  "Email",
  "TechSkills",
  "Salary",
  "Option",
];

export default function Table() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const loader = useSelector(isLoading);

  const [items, setItems] = useState(contacts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    dispatch(fetchContacts());
    // dispatch(fetchNewContacts());
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/contacts?_page=${page}&_limit=5`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const dataF = () => {
    dispatch(fetchNewContacts());
  };

  const fetchData = async () => {
    const users = await fetchUsers();
    setItems([...items, ...users]);
    if (users.length === 0 || users.length < 5) {
      setHasMore(false);
    }
    setPage(page + 1);
  };
  //   console.log(items);

  return (
    <>
      {!loader && contacts.length > 0 ? (
        <div className={styles.scrollStyle}>
          <InfiniteScroll
            dataLength={contacts.length}
            next={dataF}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={<EndMsg />}
          >
            <table>
              <thead>
                <tr>
                  {tableHeaders.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {contacts.map(
                  ({ id, name, age, email, techSkills, salary }, index) => (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{age}</td>
                      <td>{email}</td>
                      <td>{techSkills}</td>
                      <td>{salary}</td>
                      <td>
                        <button
                          onClick={() => dispatch(deleteContact(id))}
                          type="button"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      ) : (
        <p>No Contacts</p>
      )}
    </>
  );
}
