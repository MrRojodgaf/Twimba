import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.showreply){
        showReplyClick(e.target.dataset.showreply)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.dataset.replytweet){
        handleReplyBtnClick(e.target.dataset.replytweet)
    }
    else if(e.target.dataset.menu){
        handleMenuClick(e.target.dataset.menu)
    }
    else if(e.target.dataset.del){
        handleDeleteBtnClick(e.target.dataset.del)
    } 
    else if(e.target.dataset.yes){
        handleYesBtnClick(e.target.dataset.yes)
    }
    else if(e.target.dataset.no){
        handleNoBtnClick(e.target.dataset.no)
    }
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function showReplyClick(showReplyId){
    document.getElementById(`replies-${showReplyId}`).classList.toggle('hidden')
}

function handleReplyClick(replyId){
    document.getElementById(`reply-area-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value = ''
    }

}

function handleReplyBtnClick(replyBtnId){
    const replyInput = document.getElementById('reply-input')
    tweetsData.forEach(function(tweet){
        if (tweet.uuid === replyBtnId){
            console.log(replyBtnId)
            tweet.replies.unshift({
            handle: `@scrimba ✅`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: replyInput.value
            })
            console.log(replyInput.value)
            render()
            replyInput.value = ''
            document.getElementById(`reply-area-${replyBtnId}`).style.display = 'none'
            document.getElementById(`replies-${replyBtnId}`).classList.toggle('hidden')
        }  
    })      
}

function handleMenuClick(menuId){
    document.getElementById(`delete-${menuId}`).classList.toggle('hidden') 
}

function handleDeleteBtnClick(tweetId){
    document.getElementById(`del-popup-${tweetId}`).classList.toggle('hidden')
    document.getElementById(`delete-${tweetId}`).classList.toggle('hidden')
}

function handleYesBtnClick(tweetId){
    document.getElementById(`tweet-${tweetId}`).style.display = 'none'
}

function handleNoBtnClick(tweetId){
     document.getElementById(`del-popup-${tweetId}`).classList.toggle('hidden')
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }
        
          
        feedHtml += `
<div id="tweet-${tweet.uuid}" class="tweet">
    <div id="tweet-inner-${tweet.uuid}" class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"
                    ></i>
                    <span data-showreply="${tweet.uuid}">
                    ${tweet.replies.length}
                    </span>
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div> 
        </div>
            <span>
                <i id="menu-${tweet.uuid}" class="fa-solid fa-ellipsis-vertical"
                data-menu="${tweet.uuid}"
                ></i> 
            </span> 
            <button class="del-btn hidden" id="delete-${tweet.uuid}" data-del="${tweet.uuid}">Delete</button>   
            <div id="del-popup-${tweet.uuid}" class="hidden pop-up">
                <div class="del-popup">
                <h3>Delete this tweet</h3>
                <button id="yes-btn-${tweet.uuid}" class="popup-btn red" data-yes="${tweet.uuid}">Yes</button>
                <button id="no-btn-${tweet.uuid}" class="popup-btn green" data-no="${tweet.uuid}">No</button>
                </div>
           </div>          
    </div>
    <div id="reply-area-${tweet.uuid}" class="reply-input-area hidden">
			<textarea placeholder="replying to ${tweet.handle}" id="reply-input" class="reply-input"></textarea>
            <button id="reply-btn" class="reply-btn" data-replytweet=${tweet.uuid}>Reply</button>
	</div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>  
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

