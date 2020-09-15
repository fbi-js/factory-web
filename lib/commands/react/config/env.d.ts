export = getClientEnvironment;
declare function getClientEnvironment(publicUrl: any): {
    raw: {
        NODE_ENV: string;
        PUBLIC_URL: any;
        WDS_SOCKET_HOST: string | undefined;
        WDS_SOCKET_PATH: string | undefined;
        WDS_SOCKET_PORT: string | undefined;
    };
    stringified: {
        'process.env': {};
    };
};
