import { useUser } from '../context/UserContext';

const PostBox = () => {
    const { user } = useUser();

    return (
        <div style={postBoxWrapperStyle}>
                <img src={user ? "http://127.0.0.1:8000" + user.profile_picture : '/dummy-man.png'} alt='Profile' style={postBoxProfilePicStyle} />
                <div style={postBoxContentStyle}>
                  <div style={postBoxInputWrapStyle}>
                  <input
                    type='text'
                    placeholder='Let the world know what you want to say...'
                    style={postBoxInputStyle}
                  />
                  <button style={postBoxSubmitStyle}>Submit</button>
                  </div>
                  <div style={postBoxButtonsWrapperStyle}>
                    <button style={postBoxButtonStyle}>
                      <img src='Upload Photo Icon.png' alt='Photo/Video' /> Photo/Video
                    </button>
                    <button style={postBoxButtonStyle}>
                      <img src='Share Event Icon.png' alt='Share Event' /> Share Event
                    </button>
                    <button style={postBoxButtonStyle}>
                      <img src='Upload Research Icon.png' alt='Upload Research' /> Upload Research
                    </button>
                  </div>
                </div>
              </div>
    )
    
}
const postBoxWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '5px 4px 16px 0px #0000001C',
    marginBottom: '20px',
    gap: '16px',
  };
  
  const postBoxProfilePicStyle = {
    width: '90px',
    height: '94px',
    borderRadius: '12px',
    border: '0.5px solid #313131',
  };
  
  const postBoxContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '20px',
  };
  
  const postBoxInputStyle = {
    width: '100%',
    padding: '14px 24px',
    fontSize: '12px',
    lineHeight: '13.2px',
    border: '1px solid #ddd',
    borderRadius: '200px',
    backgroundColor: '#f2f2f2',
    color: '#313131',
  };
  
  const postBoxButtonsWrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const postBoxButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#313131',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '16.8px',
    letterSpacing: '2%',
    backgroundColor: 'transparent',
  };

  const postBoxInputWrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const postBoxSubmitStyle = {
    backgroundColor: '#88D8F9',
    borderRadius: '40px',
    padding: '12px 18px',
    border: 'none',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#fff',
    cursor: 'pointer',
  };

export default PostBox;