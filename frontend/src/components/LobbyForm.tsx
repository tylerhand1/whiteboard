const LobbyForm = () => {
  return (
    <div className='lobby-join-create-container'>
      <input
        type='tel'
        placeholder='Lobby Code'
        autoFocus
      />
      <h2>or</h2>
      <button>
        Create new lobby
      </button>
    </div>
  );
};

export default LobbyForm;