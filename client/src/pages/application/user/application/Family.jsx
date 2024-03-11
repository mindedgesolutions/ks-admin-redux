import React, { useEffect } from "react";
import {
  ApplicationMenu,
  ConfirmDeleteFamily,
  FamilyAddForm,
  UserAppLoader,
  UserFamilyTable,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import {
  currentMembers,
  deleteMember,
  hideModal,
} from "../../../../features/userApplication/familySlice";
import { useDispatch, useSelector } from "react-redux";
import { access, accessRevoke } from "../../../../features/user/userBasicSlice";
import { toast } from "react-toastify";
import { useLoaderData, useNavigation } from "react-router-dom";
import { setSchemeList } from "../../../../features/masters/schemeSlice";

// Loader starts ------
export const loader = (store) => async () => {
  try {
    const schemes = await customFetch.get("/master/schemes");
    const members = await customFetch.get(
      "/applications/user/all-members-partial"
    );

    store.dispatch(setSchemeList(schemes.data.data.rows));
    store.dispatch(currentMembers(members.data.response));

    return { schemes, members };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const Family = () => {
  document.title = `Family Information | ${import.meta.env.VITE_USER_TITLE}`;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((store) => store.user);
  const { fMember } = useSelector((store) => store.family);

  // Delete family member starts ------
  const deleteConfirmed = async () => {
    const response = await customFetch.delete(
      `/applications/user/delete/${user.id}/${fMember.id}`
    );

    dispatch(deleteMember(fMember.id));
    dispatch(hideModal());

    if (response?.data?.data?.rows[0]?.count == 0) {
      dispatch(accessRevoke("doc"));
      return;
    }
    dispatch(access("doc"));
    toast.success(`Member deleted successfully`);
  };

  return (
    <>
      <UserPageHeader title="Family Related Information" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              {navigation.state === "loading" ? (
                <UserAppLoader />
              ) : (
                <>
                  <FamilyAddForm />
                  <div className="card-body px-2">
                    <UserFamilyTable />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </UserPageWrapper>

      <ConfirmDeleteFamily deleteConfirmed={deleteConfirmed} />
    </>
  );
};

export default Family;
