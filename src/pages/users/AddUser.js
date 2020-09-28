import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Button as button } from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { withFormik, Formik, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

export class AddUser extends Component {
    state = {
        showPassword: false,
      };
  handleChangePassword = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thêm mới User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
              phone: "",
            }}
            validationSchema={FormikForm}
            onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
            }}
          >
            {({ handleChange, values, errors, touched, handleBlur }) => (
              <div>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.username && !!touched.username}
                >
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username && !!touched.username}
                    onBlur={handleBlur}
                    fullWidth
                    //  <Field id="username" name="username" />
                    //    {errors.username && touched.username ? <div>{errors.username}</div> : null}
                    //    <ErrorMessage name="username" />
                  />

                  <FormHelperText>
                    {touched.username ? errors.username : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.password && !!touched.password}
                >
                  <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    // value={this.state.password}
                    // onChange={this.handleChangePassword("password")}
                    onChange={handleChange}
                    name="password"
                    fullWidth
                    // onChange={handleChange}
                    // endAdornment={
                    //   <InputAdornment position="end">
                    //     <IconButton
                    //       aria-label="Toggle password visibility"
                    //       onClick={this.handleClickShowPassword}
                    //     >
                    //       {this.state.showPassword ? (
                    //         <Visibility />
                    //       ) : (
                    //         <VisibilityOff />
                    //       )}
                    //     </IconButton>
                    //   </InputAdornment>
                    // }
                    value={values.password}
                    isInvalid={!!errors.password && !!touched.password}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>
                    {touched.password ? errors.password : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={errors.email && touched.email}
                >
                  <InputLabel htmlFor="email">Email</InputLabel>

                  <Input
                    id="email"
                    name="email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email && !!touched.email}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>
                    {touched.email ? errors.email : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={errors.phone && touched.phone}
                >
                  <InputLabel htmlFor="phone">SĐT</InputLabel>
                  <Input
                    id="phone"
                    name="phone"
                    fullWidth
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone && !!touched.phone}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>
                    {touched.phone ? errors.phone : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl margin="normal">
                  <Button>Thêm</Button>
                </FormControl>
              </div>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          {/* <span>footer</span> */}
        </Modal.Footer>
      </Modal>
    );
  }
}
const FormikForm = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username quá ngắn!")
    .max(25, "Username quá dài!")
    .required("Bạn phải nhập Username"),
  password: Yup.string()
    .min(5, "password quá ngắn!")
    .max(25, "password quá dài!")
    .required("Bạn phải nhập password"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .min(5, "Email quá ngắn!")
    .max(25, "Email quá dài!")
    .required("Bạn phải nhập Email"),
  phone: Yup.string()
    .min(10, "Số điện thoại quá ngắn!")
    .max(12, "Số điện thoại quá dài!")
    .required("Bạn phải nhập Số điện thoại"),
});
export default FormikForm;
