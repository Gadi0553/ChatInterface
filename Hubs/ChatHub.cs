using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using Microsoft.AspNetCore.SignalR;

namespace AspNetCoreSignalRDemo.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task EditMessage(string user, string oldMessage, string newMessage)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, newMessage);
            // Aquí podrías almacenar el nuevo mensaje en una base de datos o estructura.
        }

       
    }


}


