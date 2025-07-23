import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ChallengeRoomLobby } from "../components/challenge/ChallengeRoomLobby";
import { WaitingRoom } from "../components/challenge/WaitingRoom";
import { CompetitionInterface } from "../components/challenge/CompetitionInterface";
import { ResultsScreen } from "../components/challenge/ResultsScreen";

export type ChallengeRoomState = 'lobby' | 'waiting' | 'competing' | 'results';

export interface ChallengeRoom {
  id: string;
  name: string;
  hostId: string;
  hostName: string;
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
    isHost: boolean;
    score?: number;
    isReady?: boolean;
  }>;
  maxParticipants: number;
  totalQuestions: number;
  currentQuestion: number;
  state: ChallengeRoomState;
  timePerQuestion: number; // seconds
}

export default function ChallengeRoom() {
  const { user } = useAuth();
  const [currentRoom, setCurrentRoom] = useState<ChallengeRoom | null>(null);
  const [roomState, setRoomState] = useState<ChallengeRoomState>('lobby');

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Yêu cầu đăng nhập</h2>
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để tham gia Phòng Thử thách
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const renderCurrentScreen = () => {
    switch (roomState) {
      case 'lobby':
        return (
          <ChallengeRoomLobby 
            onRoomCreated={(room) => {
              setCurrentRoom(room);
              setRoomState('waiting');
            }}
            onRoomJoined={(room) => {
              setCurrentRoom(room);
              setRoomState('waiting');
            }}
          />
        );
      case 'waiting':
        return currentRoom ? (
          <WaitingRoom 
            room={currentRoom}
            onStartChallenge={() => setRoomState('competing')}
            onLeaveRoom={() => {
              setCurrentRoom(null);
              setRoomState('lobby');
            }}
            onRoomUpdate={(updatedRoom) => setCurrentRoom(updatedRoom)}
          />
        ) : null;
      case 'competing':
        return currentRoom ? (
          <CompetitionInterface 
            room={currentRoom}
            onChallengeComplete={() => setRoomState('results')}
            onRoomUpdate={(updatedRoom) => setCurrentRoom(updatedRoom)}
          />
        ) : null;
      case 'results':
        return currentRoom ? (
          <ResultsScreen 
            room={currentRoom}
            onReturnToLobby={() => {
              setCurrentRoom(null);
              setRoomState('lobby');
            }}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {renderCurrentScreen()}
    </div>
  );
}
