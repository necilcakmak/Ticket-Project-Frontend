import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Editor from "../components/Editor";
import { getTicketById } from "../api/apiCalls";
import { updateTicket } from "../api/apiCalls";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import history from "../utils/history";

const TicketDetay = (props) => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [eValue, setEvalue] = useState("");

  useEffect(() => {
    getTicketById(id).then((response) => {
      setTicket(response.data);
    });
  }, []);

  useEffect(() => {
    setTicket({...ticket,detay:eValue});
  }, [eValue]);
  
  const onClickGuncelle = async (event) => {
    event.preventDefault();
   
    
    await updateTicket(ticket);
  };

  return (
    <div className="container">
      <h2>Ticket detay sayfası</h2>
      <Form>
        {id && (
          <FormGroup>
            <Label for="exampleEmail">Oluşturan Kullanıcı</Label>
            <Input
              type="text"
              name="oAdSoyad"
              value={ticket?.oadSoyad}
              disabled
            />
          </FormGroup>
        )}
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
          <Label for="examplePassword">Tarih</Label>
          <Input
            type="text"
            name="otarihi"
            id="examplePassword"
            value={ticket?.otarihi}
            disabled
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
        {props.rol === "ROLE_ADMIN" && (
          <FormGroup>
            <Label for="exampleSelect">Durum</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              value={ticket?.durum}
              onChange={(e) => {
                setTicket({
                  ...ticket,
                  durum: parseInt(e.target.value),
                });
              }}
            >
              <option value={0}>Cevap Bekliyor</option>
              <option value={1}>İşlemde</option>
              <option value={2}>Kapandı</option>
            </Input>
          </FormGroup>
        )}
        <FormGroup>
          <Label for="exampleSelect">{}</Label>
        </FormGroup>

        <CKEditor
          editor={ClassicEditor}
          onChange={(e, editor) => {
            const data = editor.getData();
            // const ddata = ReactHtmlParser(data);
            setEvalue(data );
          }}
          data={ticket?.detay}
        />

        <Button
          color="success"
          className="m-2"

          onClick={(e) => onClickGuncelle(e)}
        >
          Güncelle
        </Button>
      </Form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  rol: state.auth.kullanici.rol,
});

export default connect(mapStateToProps, null)(TicketDetay);
