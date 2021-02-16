import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { updateTicket } from "../api/apiCalls";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import history from "../utils/history";

const TicketOlustur = (props) => {
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    setTicket({
      ...ticket,
      kullaniciId: props.id,
      durum: 0,
      oncelikSeviyesi: 0,
    });
  }, []);

  const onClickGuncelle = async (event) => {
    event.preventDefault();
    await updateTicket(ticket);
  };

  return (
    <div className="container">
      <h2>Ticket detay sayfası</h2>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Konu</Label>
          <Input
            type="text"
            name="konu"
            value={ticket?.konu}
            onChange={(e) => {
              setTicket({
                ...ticket,
                konu: e.target.value,
              });
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Öncelik</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            value={ticket?.oncelikSeviyesi}
            onChange={(e) => {
              setTicket({
                ...ticket,
                oncelikSeviyesi: parseInt(e.target.value),
              });
            }}
          >
            <option value={0}>Az Öncelikli</option>
            <option value={1}>Orta Öncelikli</option>
            <option value={2}>Acil</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">{}</Label>
        </FormGroup>

        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            // const ddata = ReactHtmlParser(data);
            setTicket({ ...ticket, detay: data });
          }}
          data={ticket?.detay}
        />

        <Button
          color="success"
          className="m-2"
          onClick={(e) => onClickGuncelle(e)}
        >
          Gönder
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.auth.kullanici.id,
});
export default connect(mapStateToProps, null)(TicketOlustur);
