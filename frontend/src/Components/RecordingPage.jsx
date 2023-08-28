import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScreenRecording } from "screen-recording";

function App() {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(null);
  const [webcamStream, setWebcamStream] = useState(null);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const webcamRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const useremail = user ? user.email : null;

  const toggleWebcam = async () => {
    if (!useremail) {
      navigate(`/signup?redirect=${encodeURIComponent("/")}`);
    } else {
      if (!isWebcamActive) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setWebcamStream(stream);
          setIsWebcamActive(true);
        } catch (error) {
          console.error("Error accessing webcam:", error);
        }
      } else {
        if (webcamStream) {
          webcamStream.getTracks().forEach((track) => track.stop());
          setWebcamStream(null);
        }
        setIsWebcamActive(false);
      }
    }
  };

  useEffect(() => {
    if (webcamStream && webcamRef.current) {
      webcamRef.current.srcObject = webcamStream;
    }
  }, [webcamStream]);

  const toggleAudio = () => {
    if (webcamStream) {
      webcamStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const startRecording = () => {
    if (!useremail) {
      navigate(`/signup?redirect=${encodeURIComponent("/")}`);
    } else {
      const newRecording = ScreenRecording({
        processVideo: handleVideoProcessing,
        audio: isAudioEnabled,
      });
      setRecording(newRecording);
      newRecording.startRecording();
      setIsRecordingActive(true);
    }
  };

  const stopRecording = () => {
    if (isRecordingActive) {
      recording.stopRecording();
      setRecording(null);
      setIsRecordingActive(false);
    }
  };

  const handleVideoProcessing = (blob) => {
    setRecordedVideoBlob(blob);
  };

  const recordingInProgress = recording
    ? recording.getRecordingInProgress()
    : false;

  return (
    <div>
      <h4>Screen Recording App</h4>
      <div style={{ display: "flex" }}>
        <div style={{ width: "44rem" }}>
          {isRecordingActive ? (
            <button onClick={stopRecording}>Stop Recording</button>
          ) : (
            <button onClick={startRecording} disabled={recordingInProgress}>
              Start Recording
            </button>
          )}
          <button onClick={toggleWebcam}>
            {isWebcamActive ? "Turn Off Webcam" : "Turn On Webcam"}
          </button>
          {isWebcamActive && (
            <button onClick={toggleAudio}>
              {isAudioEnabled ? "Turn Off Audio" : "Turn On Audio"}
            </button>
          )}
          {isWebcamActive && (
            <div>
              <video
                ref={webcamRef}
                autoPlay
                muted={!isAudioEnabled}
                style={{
                  width: "100%",
                  border: "10px solid grey",
                  maxWidth: "33rem",
                  padding: "5px",
                }}
              />
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {recordedVideoBlob && (
            <div style={{ position: "relative" }}>
              <video
                ref={recordedVideoRef}
                controls
                src={URL.createObjectURL(recordedVideoBlob)}
                style={{ width: "100%", marginTop: "25px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
