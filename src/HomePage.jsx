import cl from './styles/homepage.module.scss';

const txt = 'Quiz';
const txtArr = txt.split('');
function HomePage() {

  return (
    <div className={cl.wrapper}>
          <h1>
            <span>Q</span>
            <span>u</span>
            <span className={cl.reverse}>i</span>
            <span>z</span>
              
            </h1>
          <p>
          <div>Welcome to our Question Answer Quiz Game App.</div>
          <br></br>
           This interactive platform is designed to challenge your knowledge while providing an engaging gaming experience. Whether you're a trivia enthusiast or just looking for some fun, this app has something for everyone.
          </p>
    </div>
  );
}
export default HomePage;
