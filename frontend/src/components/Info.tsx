import { IState } from '@/types';
import { useSelector } from 'react-redux';

const Info = () => {
  const groupName = useSelector((state: IState) => state.connection.groupName);

  const handleClick = () => {
    navigator.clipboard.writeText(groupName.toString());
  };

  return (
    <div className='info-container'>
      <h2>Invite your friends with the code</h2>
      <button onClick={handleClick}>{groupName}</button>
    </div>
  );
};

export default Info;