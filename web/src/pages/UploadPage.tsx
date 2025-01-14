import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import StoreContext from "../store/StoreContext";
import WarningMessage from "../components/WarningMessage";
import UploadForm from "../components/UploadForm";
import SettingsIcon from "../components/icons/SettingsIcon";
import SettingsModal from "../components/modals/SettingsModal";

// A custom hook that builds on useLocation to parse
// the query string for you.
// Reference: https://reactrouter.com/web/example/query-parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

const InfoMessage = styled.p`
  font-size: 11px;
  margin: 0 auto;
  max-width: 480px;
  color: grey;
  padding-top: 1rem;
`;

const UploadPage = () => {
  const isDevelopment = window.location.host !== "2anki.net";
  const query = useQuery();
  const view = query.get("view");

  const [isSettings, setShowSettings] = useState(
    view === "template" || view === "deck-options" || view === "card-options"
  );

  const FlexColumn = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const ImportTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
  `;

  const SettingsLink = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    .link {
      display: flex;
      color: grey;
    }
  `;

  const store = useContext(StoreContext);

  // Make sure the defaults are set if not present to ensure backwards compatability
  useEffect(() => {
    store.loadDefaults();
  }, [store]);

  return (
    <Container>
      {isDevelopment ? <WarningMessage /> : null}
      <FlexColumn>
        <ImportTitle>Import</ImportTitle>
        <SettingsLink onClick={() => setShowSettings(true)}>
          <Link className="link" to="upload?view=template">
            <SettingsIcon />
            Settings
          </Link>
        </SettingsLink>
      </FlexColumn>
      <div className="container">
        <UploadForm />
        <InfoMessage>
          2anki.net currently only supports
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.notion.so/Export-as-HTML-bf3fe9e6920e4b9883cbd8a76b6128b7"
          >
            {" "}
            HTML and ZIP exports from Notion
          </a>
          . All files are automatically deleted after 21 minutes. Checkout the{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://youtube.com/c/alexanderalemayhu?sub_confirmation=1"
          >
            YouTube channel for tutorials
          </a>
          . Notion API support is in the works and coming soon!
        </InfoMessage>
        <SettingsModal
          isActive={isSettings}
          onClickClose={() => {
            window.history.pushState({}, "", "upload");
            setShowSettings(false);
          }}
        />
      </div>
    </Container>
  );
};

export default UploadPage;
