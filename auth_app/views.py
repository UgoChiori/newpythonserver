from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post (self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "User Created Successfully.  Now perform Login to get your token", "user": serializer.data}, status=status.HTTP_201_CREATED)



class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        # Generate tokens for the user
        refresh = RefreshToken.for_user(user)

        return Response(
          {
            "user": serializer.validated_data['user'].username,
            "access": serializer.validated_data['access'],
            "refresh": serializer.validated_data['refresh'],
        },
            status=status.HTTP_200_OK,
        )