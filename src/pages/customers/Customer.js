import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AiOutlineFileAdd } from "react-icons/ai";
import { API_URL } from "../../Constants";
import CustomerService from "../../services/CustomerService";
import AddCustomer from "./AddCustomer";
// import memoize from "memoize-one";

const deleteConfirm = (id) => {
  if (window.confirm("bạn có chắc muốn xóa khách hàng này không")) {
    const token = sessionStorage.getItem("tokenStorage");
    // debugger;
    CustomerService.deleteCustomer(id, token);
    setTimeout(() => {
      // history.push('/main/customer');
      window.location.reload(false);
    }, 100);
  }
};
function Customer() {
  const getCustomer = async (id) => {
    const token = sessionStorage.getItem("tokenStorage");
    // debugger;
    await CustomerService.getCustomer(setCustomer, id, token);
    // await console.log(customer.id)
    setEditShow(true);
    
  };

  const columns = [
    {
      name: "Id",
      selector: "id",
      cell: (row) => <span>{row.id}</span>,
      sortable: true,
      grow: 0,
    },
    {
      name: "Họ tên",
      selector: "name",
      cell: (row) => <span>{row.name}</span>,
      sortable: true,
    },
    {
      name: "Tuổi",
      selector: "age",
      cell: (row) => <span>{row.age}</span>,
      sortable: true,
    },
    {
      name: "Hành động",
      selector: (row) => (
        <div>
          <Button
            onClick={() => {
              getCustomer(row.id);
            }}
            variant="info"
          >
            Sửa
          </Button>{" "}
          ||{" "}
          <Button
            id={row.id}
            onClick={() => {
              deleteConfirm(row.id);
            }}
            variant="danger"
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const countPerPage = 5;
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditShow] = useState(false);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("tokenStorage");
    CustomerService.getCustomerList(
      setCustomers,
      token,
      API_URL,
      page,
      countPerPage
    );

    // console.log(customer)
    // debugger;
    // CustomerService.setCustomer(setCustomer,token)
  }, [page]);
  //   useEffect(() => {
  //     const token = sessionStorage.getItem("tokenStorage");
  //     CustomerService.setCustomer(setCustomer, token);
  //   });
  return (
    <div>
      {/* < div className="content-wrapper " style={{minHeight: '1200.88px'}}> */}
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <Button variant="success" onClick={() => setModalShow(true)}>
                <span>Thêm mới</span>
                <AiOutlineFileAdd />
              </Button>
              <AddCustomer
                title="Thêm mới khách hàng"
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <AddCustomer
                title={"Sửa khách hàng"}
                show={editModalShow}
                onHide={() => setEditShow(false)}
                id={customer.id}
                name={customer.name}
                age={customer.age}
              />
            </div>
            <div className="col-sm-6">
              {/* <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="fake_url">Home</a></li>
                                <li className="breadcrumb-item active">DataTables</li>
                            </ol> */}
              <form className="form-inline ml-3 fr">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* <div className="card-header">
                                        <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
                                    </div> */}
                {/* /.card-header */}
                <div className="card-body">
                  <DataTable
                    title="Danh sách khách hàng"
                    columns={columns}
                    data={customers.content}
                    highlightOnHover
                    pagination
                    paginationServer={true}
                    paginationTotalRows={customers.totalElements}
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={{
                      noRowsPerPage: true,
                    }}
                    onChangePage={(pageParam) => setPage(pageParam - 1)}
                    // expandableRows={true}
                  />
                </div>
                {/* /.card-body */}
              </div>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
}

export default Customer;
