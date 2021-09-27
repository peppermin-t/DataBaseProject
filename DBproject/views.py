from django.shortcuts import render


def test(request):
    context = {'hello': 'Hello World!'}
    return render(request, 'test_template.html', context)