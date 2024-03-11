import React, { useState } from "react";
import {
  ApplicationMenu,
  InputSelect,
  InputText,
  SubmitBtn,
  UserAppLoader,
  UserBank,
  UserPageHeader,
  UserPageWrapper,
  UserSchemes,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { relationships } from "../../../../utils/data";
import { access } from "../../../../features/user/userBasicSlice";
import { toast } from "react-toastify";
import { setBankList } from "../../../../features/masters/bankSlice";

// Loader starts ------
export const loader = (store) => async () => {
  try {
    const banks = await customFetch.get("/master/banks");
    const schemes = await customFetch.get("/master/schemes");
    const info = await customFetch.get("/applications/user/bank-nominee");
    const userSchemes = await customFetch.get(
      "/applications/user/selected-schemes"
    );

    store.dispatch(setBankList(banks.data.data.rows));

    return { schemes, info, userSchemes };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const BankNominee = () => {
  document.title = `Bank & Nominee Information | ${
    import.meta.env.VITE_USER_TITLE
  }`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { info } = useLoaderData();
  const { user } = useSelector((store) => store.user);
  const { currentSchemes } = useSelector((store) => store.bankNominee);

  const [form, setForm] = useState({
    khadyasathiNo: info?.data?.data?.rows[0]?.khadyasathi_no || "",
    sasthyasathiNo: info?.data?.data?.rows[0]?.sasthyasathi_no || "",
    nomineeName: info?.data?.data?.rows[0]?.nominee_name || "",
    nomineeRelation: info?.data?.data?.rows[0]?.nominee_relationship || "",
    nomineeMobile: info?.data?.data?.rows[0]?.nominee_mobile || "",
    nomineeAadhaar: info?.data?.data?.rows[0]?.nominee_aadhar || "",
    isLoading: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const relationList = relationships.filter(
    (relation) => relation.isActive === true
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, isLoading: true });
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, schemes: currentSchemes };
    try {
      const process = info.data.data.rowCount
        ? customFetch.patch
        : customFetch.post;
      const msg = info.data.data.rowCount ? `Data updated` : `Data added`;

      await process(`/applications/user/bank-nominee`, data);

      dispatch(access("family"));

      setForm({ ...form, isLoading: false });
      toast.success(msg);
      navigate("/user/family-info");
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      setForm({ ...form, isLoading: false });
      console.log(error);
    }
  };
  return (
    <>
      <UserPageHeader title="Bank & Nominee Information" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <input type="hidden" name="appId" value={user.id} />

                {navigation.state === "loading" ? (
                  <UserAppLoader />
                ) : (
                  <div className="card-body">
                    <div className="row row-cards">
                      <UserBank />

                      <div className="col-md-6 col-sm-12">
                        <InputText
                          label="Ration Card / Khadya Sathi Card no."
                          name="khadyasathiNo"
                          required={true}
                          value={form.khadyasathiNo}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <InputText
                          label="Sasthya Sathi Card no."
                          name="sasthyasathiNo"
                          required={false}
                          value={form.sasthyasathiNo}
                          handleChange={handleChange}
                        />
                      </div>
                      <UserSchemes />
                    </div>
                    <div className="row row-cards mt-1">
                      <div className="col-md-6 col-sm-12">
                        <InputText
                          label="Nominee name"
                          name="nomineeName"
                          required={true}
                          value={form.nomineeName}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <InputSelect
                          label="Relationship with the nominee"
                          name="nomineeRelation"
                          required={true}
                          placeholder="relationship"
                          options={relationList}
                          value={form.nomineeRelation}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <InputText
                          label="Nominee mobile no."
                          name="nomineeMobile"
                          required={true}
                          value={form.nomineeMobile}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <InputText
                          label="Nominee Aadhaar no."
                          name="nomineeAadhaar"
                          required={true}
                          value={form.nomineeAadhaar}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <SubmitBtn isLoading={form.isLoading} />
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default BankNominee;
