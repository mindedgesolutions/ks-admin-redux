import React from "react";
import { PageHeader, PageWrapper } from "../../components";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SlSocialTwitter } from "react-icons/sl";
import { FaFacebookF } from "react-icons/fa";
import { useAdminContext } from "./AdminLayout";

const Dashboard = () => {
  document.title = `Dashboard | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const { user } = useAdminContext();
  return (
    <>
      <PageHeader title="Dashboard" preTitle={`Welcome ${user.name}`} />
      <PageWrapper>
        <div className="col-12">
          <div className="row row-cards">
            <div className="col-sm-6 col-lg-3">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="bg-primary text-white avatar">
                        {/* <!-- Download SVG icon from http://tabler-icons.io/i/currency-dollar --> */}
                        <MdOutlineCurrencyRupee />
                      </span>
                    </div>
                    <div className="col">
                      <div className="font-weight-medium">132 Sales</div>
                      <div className="text-muted">12 waiting payments</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="bg-green text-white avatar">
                        {/* <!-- Download SVG icon from http://tabler-icons.io/i/shopping-cart --> */}
                        <AiOutlineShoppingCart />
                      </span>
                    </div>
                    <div className="col">
                      <div className="font-weight-medium">78 Orders</div>
                      <div className="text-muted">32 shipped</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="bg-twitter text-white avatar">
                        {/* <!-- Download SVG icon from http://tabler-icons.io/i/brand-twitter --> */}
                        <SlSocialTwitter />
                      </span>
                    </div>
                    <div className="col">
                      <div className="font-weight-medium">623 Shares</div>
                      <div className="text-muted">16 today</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="bg-facebook text-white avatar">
                        {/* <!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook --> */}
                        <FaFacebookF />
                      </span>
                    </div>
                    <div className="col">
                      <div className="font-weight-medium">132 Likes</div>
                      <div className="text-muted">21 today</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Dashboard;
