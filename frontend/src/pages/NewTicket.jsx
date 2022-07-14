import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth); //select from 'auth' part of the state
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  ); //from the 'ticket' state
  const [name] = useState(user.name); //setName not required since we wont be changing it
  const [email] = useState(user.email); //setEmail not required since we wont be changing it
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        {/* Customer Name */}
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        {/* Customer Email */}
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>
        {/* Customer Product */}

        <form onSubmit={onSubmit}>
          {/* Product */}
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              id="product"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="MacBook Pro">MacBook Pro</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
            </select>
          </div>
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
