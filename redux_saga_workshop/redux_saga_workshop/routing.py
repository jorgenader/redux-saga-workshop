from channels.routing import route_class
from channels.generic.websockets import WebsocketDemultiplexer

# from accounts.bindings import UserDataBinding
# from todos.bindings import TodoDataBinding


class Demultiplexer(WebsocketDemultiplexer):
    http_user_and_session = True

    # add bindings {stream: Binding.consumer}
    consumers = {
    }


channel_routing = [
    route_class(Demultiplexer, path="^/stream")
]
