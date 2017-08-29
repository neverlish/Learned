import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="sidebar-wrapper">
          <div className="profile-container">
            <img className="profile" src="assets/images/profile.png" alt="" />
            <h1 className="name">Alan Doe</h1>
            <h3 className="tagline">Full Stack Developer</h3>
          </div>
            
          <div className="contact-container container-block">
            <ul className="list-unstyled contact-list">
                <li className="email"><i className="fa fa-envelope"></i><a href="mailto: yourname@email.com">alan.doe@website.com</a></li>
                <li className="phone"><i className="fa fa-phone"></i><a href="tel:0123 456 789">0123 456 789</a></li>
                <li className="website"><i className="fa fa-globe"></i><a href="http://themes.3rdwavemedia.com/website-templates/free-responsive-website-template-for-developers/" target="_blank">portfoliosite.com</a></li>
                <li className="linkedin"><i className="fa fa-linkedin"></i><a href="#" target="_blank">linkedin.com/in/alandoe</a></li>
                <li className="github"><i className="fa fa-github"></i><a href="#" target="_blank">github.com/username</a></li>
                <li className="twitter"><i className="fa fa-twitter"></i><a href="https://twitter.com/3rdwave_themes" target="_blank">@twittername</a></li>
            </ul>
          </div>
          <div className="education-container container-block">
            <h2 className="container-block-title">Education</h2>
            <div className="item">
              <h4 className="degree">MSc in Computer Science</h4>
              <h5 className="meta">University of London</h5>
              <div className="time">2011 - 2012</div>
            </div>
            <div className="item">
              <h4 className="degree">BSc in Applied Mathematics</h4>
              <h5 className="meta">Bristol University</h5>
              <div className="time">2007 - 2011</div>
            </div>
          </div>
            
          <div className="languages-container container-block">
            <h2 className="container-block-title">Languages</h2>
            <ul className="list-unstyled interests-list">
              <li>English <span className="lang-desc">(Native)</span></li>
              <li>French <span className="lang-desc">(Professional)</span></li>
              <li>Spanish <span className="lang-desc">(Professional)</span></li>
            </ul>
          </div>
            
          <div className="interests-container container-block">
            <h2 className="container-block-title">Interests</h2>
            <ul className="list-unstyled interests-list">
              <li>Climbing</li>
              <li>Snowboarding</li>
              <li>Cooking</li>
            </ul>
          </div>
            
        </div>
        
        <div className="main-wrapper">
            
          <section className="section summary-section">
            <h2 className="section-title"><i className="fa fa-user"></i>Career Profile</h2>
            <div className="summary">
              <p>Summarise your career here lorem ipsum dolor sit amet, consectetuer adipiscing elit. You can <a href="http://themes.3rdwavemedia.com/website-templates/orbit-free-resume-cv-template-for-developers/" target="_blank">download this free resume/CV template here</a>. Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.</p>
            </div>
          </section>
          
          <section className="section experiences-section">
            <h2 className="section-title"><i className="fa fa-briefcase"></i>Experiences</h2>
            
            <div className="item">
              <div className="meta">
                <div className="upper-row">
                  <h3 className="job-title">Lead Developer</h3>
                  <div className="time">2015 - Present</div>
                </div>
                <div className="company">Startup Hubs, San Francisco</div>
              </div>
              <div className="details">
                <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo.</p>  
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
              </div>
            </div>
            
            <div className="item">
              <div className="meta">
                <div className="upper-row">
                  <h3 className="job-title">Senior Software Engineer</h3>
                  <div className="time">2014 - 2015</div>
                </div>
                <div className="company">Google, London</div>
              </div>
              <div className="details">
                <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>  
                  
              </div>
            </div>
            
            <div className="item">
              <div className="meta">
                <div className="upper-row">
                  <h3 className="job-title">UI Developer</h3>
                  <div className="time">2012 - 2014</div>
                </div>
                <div className="company">Amazon, London</div>
              </div>
              <div className="details">
                <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>  
              </div>
            </div>
              
          </section>
          
          <section className="section projects-section">
            <h2 className="section-title"><i className="fa fa-archive"></i>Projects</h2>
            <div className="intro">
              <p>You can list your side projects or open source libraries in this section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ligula in nunc bibendum fringilla a eu lectus.</p>
            </div>
            <div className="item">
              <span className="project-title"><a href="#hook">Velocity</a></span> - <span className="project-tagline">A responsive website template designed to help startups promote, market and sell their products.</span>
                
            </div>
            <div className="item">
              <span className="project-title"><a href="http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-web-development-agencies-devstudio/" target="_blank">DevStudio</a></span> - 
              <span className="project-tagline">A responsive website template designed to help web developers/designers market their services. </span>
            </div>
            <div className="item">
              <span className="project-title"><a href="http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-for-startups-tempo/" target="_blank">Tempo</a></span> - <span className="project-tagline">A responsive website template designed to help startups promote their products or services and to attract users &amp; investors</span>
            </div>
            <div className="item">
              <span className="project-title"><a href="hhttp://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-mobile-apps-atom/" target="_blank">Atom</a></span> - <span className="project-tagline">A comprehensive website template solution for startups/developers to market their mobile apps. </span>
            </div>
            <div className="item">
              <span className="project-title"><a href="http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-for-mobile-apps-delta/" target="_blank">Delta</a></span> - <span className="project-tagline">A responsive Bootstrap one page theme designed to help app developers promote their mobile apps</span>
            </div>
          </section>
          
          <section className="skills-section section">
            <h2 className="section-title"><i className="fa fa-rocket"></i>Skills &amp; Proficiency</h2>
            <div className="skillset">        
              <div className="item">
                <h3 className="level-title">Python &amp; Django</h3>
                <div className="level-bar">
                  <div className="level-bar-inner" data-level="98%">
                  </div>                                      
                </div>
              </div>
              
              <div className="item">
                <h3 className="level-title">Javascript &amp; jQuery</h3>
                <div className="level-bar">
                  <div className="level-bar-inner" data-level="98%">
                  </div>                                      
                </div>
              </div>
              
              <div className="item">
                <h3 className="level-title">Angular</h3>
                <div className="level-bar">
                  <div className="level-bar-inner" data-level="98%">
                  </div>                                      
                </div>
              </div>
              
              <div className="item">
                <h3 className="level-title">HTML5 &amp; CSS</h3>
                <div className="level-bar">
                  <div className="level-bar-inner" data-level="95%">
                  </div>                                      
                </div>
              </div>
              
              <div className="item">
                <h3 className="level-title">Ruby on Rails</h3>
                <div className="level-bar">
                  <div className="level-bar-inner" data-level="85%">
                  </div>                                      
                </div>
              </div>
              
              <div className="item">
                <h3 className="level-title">Sketch &amp; Photoshop</h3>
                <div className="level-bar">
                  <div className="level-bar-inner" data-level="60%">
                  </div>                                      
                </div>
              </div>
                
            </div>  
          </section>
            
        </div>
      </div>
    );
  }
}

export default App;
