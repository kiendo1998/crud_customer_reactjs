import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as Yup from "yup";
import "../../App.css";
import { API_URL } from "../../Constants";
import { phoneRegExp } from "../../ultis/regexUtils";
import CustomerService from "../../services/CustomerService";
import { useHistory } from "react-router-dom";
const AddCustomerSchema = Yup.object().shape({
  name: Yup.string().min(2, "Quá ngắn").required("Không được bỏ trống"),
  age: Yup.string().required("Không được bỏ trống"),
});

export default function CustomerAdd(props) {
  let history = useHistory();
  useEffect(() => {
    // const token = sessionStorage.getItem("tokenStorage");
    // CustomerService.addCustomer(name, age, token);
    // setTimeout(() => {
    //     props.history.push("/main/customer");
    //   }, 1000)
  }, []);

  const handleAddByMouseClick = (name, age) => {
    CustomerService.addCustomer(
      name,
      age,
      sessionStorage.getItem("tokenStorage")
    )
      .then((response) => {
        setTimeout(() => {
          console.log("hello");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      window.location.reload(false);
    }, 100);
  };
  const handleEditByMouseClick = (id, name, age) => {
    //   debugger;
    CustomerService.editCustomer(
      id,
      name,
      age,
      sessionStorage.getItem("tokenStorage")
    )
      .then((response) => {
        setTimeout(() => {
          //   props.history.push("/main/customer");
          console.log("hello");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      // history.push('/main/customer');
      window.location.reload(false);
    }, 100);
  };
//   const initialValues = {
//     id: {props.id},
//     name: "",
//     age: "",
//   };
//   const formValues = {
//     id: 1,
//     name: "do",
//     age: "Trung",
//   };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Formik
          initialValues={{
              id: props.id,
              name: props.name,
              age: props.age,
          }}
          validationSchema={AddCustomerSchema}
          // onSubmit={values => {
          //     console.log(values);
          // }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            // Simulate submitting to database, shows us values submitted, resets form
            setTimeout(() => {
              // alert();
              console.log(JSON.stringify(values, null, 2));
              resetForm();
              if (props.title === "Thêm mới khách hàng") {
                handleAddByMouseClick(values.name, values.age);
              } else {
                handleEditByMouseClick(values.id, values.name, values.age);
              }

              setSubmitting(false);
            }, 500);
          }}
          //   enableReinitialize
        >
          {/* Callback function containing Formik state and helpers that handle common form actions */}
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {/* Mst */}
              <Form.Group as={Row} controlId="id">
                <Col sm="9" md="9">
                  <Form.Control
                    plaintext
                    readOnly
                    type="hidden"
                    name="id"
                    // placeholder="Id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                    isInvalid={!!errors.id && !!touched.id}
                  />    
                </Col>
              </Form.Group>
              {/* Mst */}
              <Form.Group as={Row} controlId="name">
                <Form.Label column sm="3" md="3">
                  Họ và tên
                </Form.Label>
                <Col sm="9" md="9">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Họ và tên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    isInvalid={!!errors.name && !!touched.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              {/* cqt varchar(5) utf8_general_ci YES (NULL) select,insert,update,references */}
              <Form.Group as={Row} controlId="age">
                <Form.Label column sm="3" md="3">
                  Tuổi
                </Form.Label>
                <Col sm="9" md="9">
                  <Form.Control
                    type="text"
                    name="age"
                    placeholder="tuổi"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                    isInvalid={!!errors.age && !!touched.age}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Button
                type="submit"
                // onClick={handleLoginByMouseClick}
                disabled={isSubmitting}
              >
                Lưu
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>

      {/* onClick={props.onHide} */}
      {/* <Modal.Footer>
                <Button type="submit" >Lưu</Button>
            </Modal.Footer> */}
    </Modal>
  );
}
