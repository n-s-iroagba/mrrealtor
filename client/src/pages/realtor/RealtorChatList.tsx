import React from 'react'
import ChatList from '../../features/chat/layout/ChatList'

const RealtorChatList = ()=>{
    return(
        <>
        <div>Realtor Chat List Component</div>
        <ChatList currentRealtorId={1}/>
        </>
    )
}
export default RealtorChatList