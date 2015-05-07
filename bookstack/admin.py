from django.contrib import admin
from bookstack.models import Book
from bookstack.models import Author, Publisher, Category
from bookstack.models import Stack, BookStack


class BookStackInline(admin.StackedInline):
    model = BookStack
    extra = 0
    ordering = ('position',)

    def get_queryset(self, request):
        qs = super(BookStackInline, self).get_queryset(request).prefetch_related('book__authors', 'book__publishers')
        if request.user.is_superuser:
            return qs
        return qs.filter(author=request.user)

class StackAdmin(admin.ModelAdmin):
    inlines = (BookStackInline, )
    exclude = ('user',)

    def save_model(self, request, obj, form, change):
        if not change:
            obj.user = request.user
        obj.save()

    def get_queryset(self, request):
        qs = super(StackAdmin, self).get_queryset(request).prefetch_related('bookstack_set__book__authors', 'bookstack_set__book__publishers', 'bookstack_set__categories')
        if request.user.is_superuser:
            return qs
        return qs.filter(author=request.user)

admin.site.register(Stack, StackAdmin)
admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Publisher)
admin.site.register(Category)
