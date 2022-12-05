import { useSelector, useDispatch } from "react-redux";
import {
  getContacts,
  isLoading,
  isMore,
  numberLimit,
} from "../../redux/contacts/contactsSelectors";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  deleteContact,
  fetchContacts,
  fetchNewContacts,
} from "../../redux/contacts/contactsOperations";

import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Loader from "../Loader/Loader";
import EndMsg from "../EndMsg/EndMsg";
import {
  DivStyle,
  TableBtn,
  TableStyle,
  TdBody,
  ThHead,
  TrHead,
} from "./Table.styled";
import ContactsForm from "../ContactForm/ContactForm";

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
  const userLimit = useSelector(numberLimit);

  const [limit, setLimit] = useState(null);
  const [items, setItems] = useState(contacts);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    dispatch(fetchContacts(5));
  }, []);

  const fetchData = async () => {
    const usersFromServer = dispatch(fetchContacts(page));
    if (usersFromServer.length === 0 || usersFromServer.length < 5) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  //   const fetchUsers = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:4000/contacts?_page=${page}&_limit=5`
  //       );
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const fetchData = async () => {
  //     const users = await fetchUsers();
  //     setItems([...items, ...users]);
  //     if (users.length === 0 || users.length < 5) {
  //       setHasMore(false);
  //     }
  //     setPage(page + 1);
  //   };
  console.log(contacts);

  const hasmore = useSelector(isMore); //true default

  return (
    <>
      <ContactsForm></ContactsForm>
      {contacts.length > 0 ? (
        <DivStyle>
          <InfiniteScroll
            dataLength={contacts.length}
            next={(e) => dispatch(fetchNewContacts(userLimit + 5))}
            height={400}
            // pullDownToRefreshThreshold={150}
            hasMore={true}
            loader={<Loader />}
            endMessage={<EndMsg />}
            // scrollableTarget="scrollableDiv"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TableStyle>
              <thead>
                <TrHead>
                  {tableHeaders.map((item, index) => (
                    <ThHead key={index}>{item}</ThHead>
                  ))}
                </TrHead>
              </thead>

              <tbody>
                {contacts.map(
                  ({ id, name, age, email, techSkills, salary }, index) => (
                    <TrHead key={id}>
                      <TdBody>{index + 1}</TdBody>
                      <TdBody>{name}</TdBody>
                      <TdBody>{age}</TdBody>
                      <TdBody>{email}</TdBody>
                      <TdBody>{techSkills}</TdBody>
                      <TdBody>{salary}</TdBody>
                      <TdBody>
                        <TableBtn
                          onClick={() => {
                            dispatch(deleteContact(id));
                            // fetchData();
                            // fetchUsers();
                            // dispatch(fetchContacts());
                          }}
                          type="button"
                        >
                          <AiOutlineDelete />
                        </TableBtn>
                      </TdBody>
                    </TrHead>
                  )
                )}
              </tbody>
            </TableStyle>
          </InfiniteScroll>
        </DivStyle>
      ) : (
        <p>No Contacts</p>
      )}
    </>
  );
}
