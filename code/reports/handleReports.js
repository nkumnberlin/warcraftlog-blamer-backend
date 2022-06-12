"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReports = void 0;
const handleReports = async (body, headers) => {
    console.log('OK HIER', body, ' xxx ', headers);
    const { action } = body;
    console.log('USER CONTROLLER', action);
    // if (ACTIONS.USER.CREATE_USER === action) {
    //     const {user} = body;
    //     try {
    //         console.log('CREATE CLIENT', user);
    //         if (user.variant.type === 'CLIENT') {
    //             return await createClient(user);
    //         }
    //         return await createMicrolancer(user);
    //     } catch (e) {
    //         return e;
    //     }
    // }
};
exports.handleReports = handleReports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlUmVwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhhbmRsZVJlcG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ08sTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLElBQVMsRUFBRSxPQUFZLEVBQUUsRUFBRTtJQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLE1BQU0sRUFBQyxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUM7SUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2Qyw2Q0FBNkM7SUFDN0MsMkJBQTJCO0lBQzNCLFlBQVk7SUFDWiw4Q0FBOEM7SUFDOUMsZ0RBQWdEO0lBQ2hELCtDQUErQztJQUMvQyxZQUFZO0lBQ1osZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsUUFBUTtJQUNSLElBQUk7QUFDUixDQUFDLENBQUM7QUFoQk8sUUFBQSxhQUFhLGlCQWdCcEIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjb25zdCBoYW5kbGVSZXBvcnRzID0gYXN5bmMgKGJvZHk6IGFueSwgaGVhZGVyczogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdPSyBISUVSJywgYm9keSwgJyB4eHggJywgaGVhZGVycyk7XG4gICAgICAgIGNvbnN0IHthY3Rpb259ID0gYm9keTtcbiAgICAgICAgY29uc29sZS5sb2coJ1VTRVIgQ09OVFJPTExFUicsIGFjdGlvbik7XG4gICAgICAgIC8vIGlmIChBQ1RJT05TLlVTRVIuQ1JFQVRFX1VTRVIgPT09IGFjdGlvbikge1xuICAgICAgICAvLyAgICAgY29uc3Qge3VzZXJ9ID0gYm9keTtcbiAgICAgICAgLy8gICAgIHRyeSB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ0NSRUFURSBDTElFTlQnLCB1c2VyKTtcbiAgICAgICAgLy8gICAgICAgICBpZiAodXNlci52YXJpYW50LnR5cGUgPT09ICdDTElFTlQnKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBhd2FpdCBjcmVhdGVDbGllbnQodXNlcik7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBhd2FpdCBjcmVhdGVNaWNyb2xhbmNlcih1c2VyKTtcbiAgICAgICAgLy8gICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH07XG4iXX0=