import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineFileAdd } from "react-icons/ai";
import { API_URL } from "../../Constants";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddUser } from "./AddUser";
let num = 1;
const columns = [
  {
    name: "Số thứ tự",
    selector: "diachi",
    cell: (row) => <span>{num++}</span>,
    sortable: true,
    grow: 0,
  },
  {
    name: "Tên đăng nhập",
    selector: "diachi",
    cell: (row) => <span>{row.diachi}</span>,
    sortable: true,
  },
  {
    name: "Email",
    cell: (row) => <span>{row.tenNnt}</span>,
    sortable: true,
  },
  {
    name: "Số điện thoại",
    selector: "serial",
    cell: (row) => <span>{row.serial}</span>,
    sortable: true,
  },
  {
    name: "Hành động",
    // selector: "serial",
    // cell: (row) => <span>{row.serial}</span>,
    sortable: true,
  },
];
function User() {
  const [ttdn, setTtdns] = useState([]);
  const [page, setPage] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const addClose = () => setShowAdd(false);
  const countPerPage = 10;

  useEffect(() => {
    const token = sessionStorage.getItem("tokenStorage");
    const getTtdnList = () => {
      axios
        .get(` ${API_URL}/api/ttdn?page=${page}&limit=${countPerPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTtdns(res.data);
        })
        .catch((err) => {
          console.log(err);
          setTtdns([]);
        });
    };
    getTtdnList();
  }, [page]);

  return (
    //   let addModalClose=()=>this.setState()
    <div>
      {/* < div className="content-wrapper " style={{minHeight: '1200.88px'}}> */}
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <ButtonToolbar>
                <Button
                  className="btn btn-success"
                  onClick={() => setShowAdd(true)}
                >
                  <span>Thêm mới</span>
                  <AiOutlineFileAdd />
                </Button>
                <AddUser
                    show={showAdd}
                    onHide={addClose}
                />
              </ButtonToolbar>
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
                    title="Danh sách User admin"
                    columns={columns}
                    data={ttdn.list}
                    highlightOnHover
                    pagination
                    paginationServer={true}
                    paginationTotalRows={ttdn.total}
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

export default User;
