import React from "react";
import TrackSearchResult from "./TrackSearchResult";
import { Container } from "react-bootstrap";

export default function Searches({ searchres, chooseTrack, lyrics }) {
  return (
    // <Container>
    <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
      {searchres &&
        searchres.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      {searchres && searchres.length === 0 && (
        <div className="text-center" style={{ whiteSpace: "pre" }}>
          {lyrics}
        </div>
      )}
    </div>
    // {/* </Container> */}
  );
}
