import { useSelector, useDispatch } from "react-redux";
import { getContacts, isMore } from "../../redux/contacts/contactsSelectors";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect } from "react";
import {
  deleteContact,
  fetchContacts,
} from "../../redux/contacts/contactsOperations";

import InfiniteScroll from "react-infinite-scroll-component";
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

  useEffect(() => {
    dispatch(fetchContacts(5));
  }, [dispatch]);

  const hasmore = useSelector(isMore);

  return (
    <>
      <ContactsForm></ContactsForm>
      {contacts.length > 0 ? (
        <DivStyle>
          <InfiniteScroll
            dataLength={contacts.length}
            next={(e) => dispatch(fetchContacts(contacts.length + 5))}
            height={400}
            hasMore={hasmore}
            loader={<Loader />}
            endMessage={<EndMsg />}
            scrollableTarget="scrollableDiv"
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
