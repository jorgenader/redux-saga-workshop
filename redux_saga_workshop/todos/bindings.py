from channels_api.bindings import ResourceBinding

from todos.models import Todo
from todos.serializers import TodoSerializer


class TodoDataBinding(ResourceBinding):
    model = Todo
    stream = 'meetings'
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
