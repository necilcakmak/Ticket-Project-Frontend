import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import * as ticketAction from "../redux/actions/ticketAction";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Alert,
} from "reactstrap";

const TicketListesi = (props) => {
  const [tickets, setTickets] = useState([]);
  const [modal, setModal] = useState(false);

  const [selectedId, setSelectedId] = useState();

  const toggle = () => setModal(!modal);
  let renk=["info","success","danger"]
  let renkOncelik=["dark","warning","danger"]
  let durums=["Cevap Bekliyor","İşlemde","Kapandı"]
  let durumsOncelik=["Az Öncelikli","Orta Öncelikli","Acil"]
  useEffect(() => {
    setTickets(props.ticket.ticketlar);
  }, [props.ticket.ticketlar]);

  useEffect(() => {
    if (props.isAdmin) {
      props.actions.getTickets();
    } else {
      props.actions.getTicketsById(props.loginId);
    }
  }, []);

  const onClickSil = (id) => {
    toggle();
    props.actions.deleteTicket(id);
  };
  return (
    <div>
      {!props.isAdmin && (
        <Link to={"/ticketOlustur/"}>
          <button className="btn btn-success m-2">ekle</button>
        </Link>
      )}

      <Table  hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Konu</th>
            <th>Tarihi</th>
            <th>Oluşturan Kullanıcı</th>
            <th>Öncelik</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((t) => (
            <tr key={t.id}>
              <th scope="row">{t.id}</th>
              <td>{t.konu}</td>
              <td>{t.otarihi}</td>
              <td>{t.oadSoyad}</td>
              <td> <Alert color={renkOncelik[t.oncelikSeviyesi]}>{durumsOncelik[t.oncelikSeviyesi]}</Alert></td>
              <td>
                <Alert color={renk[t.durum]}>{durums[t.durum]}</Alert>
              </td>
              <td>
                <Link to={"/detay/" + t.id}>
                  {<button className="btn btn-info">Detay</button>}
                </Link>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => {
                    setSelectedId(t.id);
                    toggle();
                  }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>Silmek istediğinizden emin misiniz ?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => onClickSil(selectedId)}>
            Sil
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            İptal
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  loginId: state.auth.kullanici.id,
  isAdmin: state.auth.kullanici.rol === "ROLE_ADMIN" ? true : false,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getTickets: bindActionCreators(ticketAction.getTickets, dispatch),
      getTicketsById: bindActionCreators(ticketAction.getTicketsById, dispatch),
      deleteTicket: bindActionCreators(ticketAction.deleteTicket, dispatch),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TicketListesi);
