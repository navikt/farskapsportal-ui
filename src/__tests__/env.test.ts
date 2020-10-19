test('Check environmental variables', () => {
    expect(process.env.REACT_APP_URL).not.toBeUndefined();
    expect(process.env.REACT_APP_LOGINSERVICE_URL).not.toBeUndefined();
});

export {};
