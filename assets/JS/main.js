import { posts } from "./posts.js";


const structurePage = function () {

    const result = posts.map(renderPost).join('');

    document.querySelector('.posts').insertAdjacentHTML('beforeend', result);
}

structurePage();

/*...................Scroll down subnavbar.......................*/

const subNavbar = document.querySelector('.sub-navbar');
const scrollResponser = document.querySelector('.scroll-responser');

if (subNavbar && scrollResponser) {

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];

        if (entry.boundingClientRect.top <= 0) { // top of element has reached or passed the viewport top
            subNavbar.classList.remove('display-none');
            subNavbar.classList.remove('translate');
        } else { // element is below the viewport top
            subNavbar.classList.add('display-none');
            subNavbar.classList.add('translate');
        }
    });

    observer.observe(scrollResponser);
}

/*............................Post Header.....................................*/

function renderHeader(post) {
    let result = `
                    <div class="row">
                        <div class="flex post-heading">`;

    if (post.timeline) {
        result += `                        
                        <img src="assets/Images/profile.webp" width="40" height="40" class="circle-image" title="Young Raheeq" title="Yound Raheeq">
                            <div>
                                <p><a href="#" class="black-text">${post.from}</a></p>
                                <a class="gray-text date" href="#">${post.time} .</a>
                                <svg viewBox="0 0 16 16" width="12" height="12" fill="#68656C" title="Shared with Your friends" ><title>Shared with Your friends</title><g fill-rule="evenodd" transform="translate(-448 -544)"><path d="M459.75 551c-1.24 0-2.25-1.121-2.25-2.5 0-1.542.863-2.5 2.25-2.5s2.25.958 2.25 2.5c0 1.379-1.01 2.5-2.25 2.5m.692 1h-1.384c-.105 0-.21.005-.312.014a.3.3 0 0 0-.186.509 5.03 5.03 0 0 1 1.44 3.53v1.147a.3.3 0 0 0 .3.3h2.015c.929 0 1.685-.756 1.685-1.685v-.257a3.562 3.562 0 0 0-3.558-3.558m-3.032 6.5h-7.82c-.877 0-1.59-.714-1.59-1.59v-.857a4.057 4.057 0 0 1 4.053-4.053h2.894a4.057 4.057 0 0 1 4.053 4.053v.856c0 .877-.713 1.591-1.59 1.591m-3.91-7.5c-1.379 0-2.5-1.346-2.5-3 0-1.879.935-3 2.5-3s2.5 1.121 2.5 3c0 1.654-1.121 3-2.5 3"></path></g></svg>
                            </div>               
                        <i data-visualcompletion="css-img" class="flex flex-center" aria-label="posted to" role="img" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yn/r/VtrO23iwG9k.png&quot;); background-position: 0px -269px; background-size: auto; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;"></i>
                        <a href="#" class="black-text">Raheeq M Mousa</a>
                    </div>`;
    } else {
        result += `                        
                        <img src="assets/Images/Young Raheeq.png" width="40" height="40" class="circle-image" alt="Yound Raheeq" title="Yound Raheeq">
                        <div>
                            <p><a href="#" class="black-text">Raheeq M Mousa</a></p>
                            <a class="gray-text date" href="#">${post.time} .</a>
                            <svg viewBox="0 0 16 16" width="12" height="12" fill="#68656C" title="Shared with Your friends"><title>Shared with Your friends</title><g fill-rule="evenodd" transform="translate(-448 -544)"><path d="M459.75 551c-1.24 0-2.25-1.121-2.25-2.5 0-1.542.863-2.5 2.25-2.5s2.25.958 2.25 2.5c0 1.379-1.01 2.5-2.25 2.5m.692 1h-1.384c-.105 0-.21.005-.312.014a.3.3 0 0 0-.186.509 5.03 5.03 0 0 1 1.44 3.53v1.147a.3.3 0 0 0 .3.3h2.015c.929 0 1.685-.756 1.685-1.685v-.257a3.562 3.562 0 0 0-3.558-3.558m-3.032 6.5h-7.82c-.877 0-1.59-.714-1.59-1.59v-.857a4.057 4.057 0 0 1 4.053-4.053h2.894a4.057 4.057 0 0 1 4.053 4.053v.856c0 .877-.713 1.591-1.59 1.591m-3.91-7.5c-1.379 0-2.5-1.346-2.5-3 0-1.879.935-3 2.5-3s2.5 1.121 2.5 3c0 1.654-1.121 3-2.5 3"></path></g></svg>
                        </div>
                    </div>`;
    }
    result += `<svg viewBox="0 0 20 20" width="20" height="20" fill="#65686c" ><g fill-rule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
                    </div>`;
    return result;
}

/*.........................Post body............................*/

function renderBody(post) {
    let result = `
                <div>
                    ${post.type === "link"
            ? (post.text
                ? `<a href='${post.text}' class="post-data link" >https://raheeqmousa.github.io/XOzone/</a>
                                <a href="${post.text}" target="_blank" class="flex flex-center flex-column" rel="noopener noreferrer">
                                    ${post.linkImage}
                                    <div class="gray-background" style="padding:12px 12px; width:100%;">
                                            <h3>${post.linkHeading}</h3>
                                            <p class="gray-text">${post.linkDesc}</p>
                                    </div>
                                </a>`
                : ''
            )
            : (post.text
                ? `<p class="post-data">${post.text}</p>`
                : ''
            )
        }
                    ${post.type === "MultipleImage" ?
            `<div class='images'>
                            ${post.images.map(x => {
                return `<div class="image-wrapper">
                                    ${x}
                                </div>`
            }).join('')}
                        </div>`: ''
        }

                    ${post.type === "image" ?
            post.images[0] : ''
        }
                    
                    ${post.ImagesOfReacted !== null ?
            `<div class="row reaction-comments" >
                            <div>
                                ${post.ImagesOfReacted}</span>
                                <span class="gray-text">${post.namesOfReacted}</span>
                            </div>      
                            <p class="gray-text">${post.numOfComments ? `${post.numOfComments} comments` : ''} </p>
                            <span class="gray-text display-none">${post.numOfComments ? `${post.numOfComments} <i  data-visualcompletion="css-img" class="gray-text" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yP/r/w75nnTcI_UI.png&quot;); background-position: 0px -1076px; background-size: 21px 1149px; width: 16px; height: 16px; background-repeat: no-repeat;"></i>
`: ''} </span>
                           
                         </div>`: ''
        }
            `;

    return result;
}

/*...........................Post options.............................*/

function renderPostOptions(post) {

    return `                    <div class="row post-options">
                        <div class="post-btn flex flex-center gray-text">                     
                            ${post.postReactionImg !== null ? post.postReactionImg : '<i data-visualcompletion="css-img" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/y1/r/6OydjuD6mEX.png&quot;); background-position: 0px -863px; background-size: 33px 1177px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>'}
                            <p class="${post.postReactionStyle !== null ? post.postReactionStyle : ''}">${post.postReaction !== null ? post.postReaction : 'Like'}</p>
                        </div >
                        <div class="post-btn flex flex-center gray-text">
                            <i data-visualcompletion="css-img" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yX/r/4WPKeZhFbFO.png&quot;); background-position: 0px -821px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
                            <p>Comment</p>
                        </div>
                        <div class="post-btn flex flex-center gray-text">
                            <i data-visualcompletion="css-img" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yX/r/4WPKeZhFbFO.png&quot;); background-position: 0px -884px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
                            <p>Share</p> 
                        </div>
                    </div>
                    ${post.reply !== null ? '<span class="gray-text" style="height: 32px;">View more comments</span>' : ''}
                </div>`;

}

/*.......................Post's comment field...............................*/

function renderCommentInput(){
    return `<div class="flex comment-row">
                        <div class="drop-down-img">
                            <img src="assets/Images/Young Raheeq.png" width="30" height="30" class="circle-image" alt="Yound Raheeq" title="Young Raheeq">
                            <svg class="dropdown" viewBox="0 0 16 16" width="8" height="8" fill="currentColor"><g fill-rule="evenodd" transform="translate(-448 -544)"><path fill-rule="nonzero" d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"></path></g></svg>
                        </div>
                        
                        <form action="somewhere.py" method="post" class="row comment-form">
                            <input 
                            type="text" 
                            name="comment"  
                            placeholder="Write a comment..." 
                            aria-label="Write a comment"
                            >
                            <div class="comment-icons">
                            <button aria-label="Avatar btn">
                                <i 
                                style="
                                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/Eoi2rFThRn5.png');
                                    background-position: 0px -906px; 
                                    background-size: auto; 
                                    width: 16px; 
                                    height: 16px; 
                                    background-repeat: no-repeat; 
                                    display: inline-block;
                                ">
                                </i>
                            </button>
                            <button aria-label="Emojis btn">
                                <i data-visualcompletion="css-img" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/Tfc4faal4G1.png&quot;); background-position: 0px -153px; background-size: auto; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;"></i>      </button>
                            <button aria-label="Camera btn">
                                <i data-visualcompletion="css-img" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/Eoi2rFThRn5.png&quot;); background-position: 0px -940px; background-size: auto; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;"></i>
                            </button>
                            <button aria-label="GIF btn">
                                <i data-visualcompletion="css-img" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/Eoi2rFThRn5.png&quot;); background-position: 0px -974px; background-size: auto; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;"></i>
                            </button>
                            <button aria-label="Stickers btn">
                                <i data-visualcompletion="css-img" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/Eoi2rFThRn5.png&quot;); background-position: 0px -1042px; background-size: auto; width: 16px; height: 16px; background-repeat: no-repeat; display: inline-block;"></i>
                            </button>
                            </div>
                        </form>    
                    </div>`;
}

/*.................................Post's replies........................................*/

function renderComments(post) {
    let result = ``;
    if (post.reply !== null)
        result += `
                
                <div>
                    <div class="flex comment">
                        <img src='assets/Images/${post.whoReplied === "Raheeq M Mousa" ? 'Young Raheeq.png' : 'profile.webp'}' width="30" height="30" class="circle-image" alt="publisher image" title="publisher image">
                        <div class="comment">       
                            <div class="comment-content gray-background">
                               <p><a href="#" class="black-text comment-header">${post.whoReplied !== null ? post.whoReplied : ''}</a></p>
                                <p>${post.reply !== null ? post.reply : ''}</p>
                            </div>
                            <div class="comment-options row">
                                <div class="row">
                                    <a href="#" class="gray-text">23w</a>
                                    <span class="gray-text">Like</span>
                                    <span class="gray-text">Reply</span>
                                </div>
                                
                                <p>${post.replyRecationImage !== null ? post.replyRecationImage : ''}</p>                               
                            </div>
                        </div>
                    </div>
                </div>`;

    result += renderCommentInput();

    return result
}

/*..........................Render Full Post....................................*/

function renderPost(post) {
    return `
    <article class="post-layout flex">
        ${renderHeader(post)}
        ${renderBody(post)}
        ${renderPostOptions(post)}
        ${renderComments(post)}
    </article>
    `;
}