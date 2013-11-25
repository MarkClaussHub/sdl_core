package com.ford.avarsdl.test.jsoncontroller;

import org.json.JSONException;
import org.json.JSONObject;

import android.util.TimeUtils;

import com.ford.avarsdl.jsoncontroller.JSONController;
import com.ford.avarsdl.jsonparser.EBEMethods;
import com.ford.avarsdl.jsonparser.EMBMethods;
import com.ford.avarsdl.test.stubs.TCPClientStub;
import com.ford.avarsdl.util.RPCConst;

import junit.framework.TestCase;

public class JSONControllerTest extends TestCase {

	private TCPClientStub mTcpStub;
	private final int ID = 100;
	private JSONController mController;

	protected void setUp() throws Exception {
		super.setUp();
		mTcpStub = new TCPClientStub(RPCConst.LOCALHOST,
				RPCConst.TCP_SERVER_PORT);
		mController = new JSONController("name", mTcpStub);

	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}

	public final void testJSONControllerString() {
		JSONController controller = new JSONController("name");
		assertNotNull(controller);
	}

	public final void testRegister() {
		String method = RPCConst.CN_MESSAGE_BROKER + "."
				+ EMBMethods.registerComponent.toString();
		mController.register(ID);
		try {
			JSONObject obj = new JSONObject(mTcpStub.getMessage());
			assertEquals(ID, obj.getInt(RPCConst.TAG_ID));
			assertEquals(method, obj.getString(RPCConst.TAG_METHOD));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	public final void testUnregister() {
		String method = RPCConst.CN_MESSAGE_BROKER + "."
				+ EMBMethods.unregisterComponent.toString();
		mController.unregister(ID);
		try {
			JSONObject obj = new JSONObject(mTcpStub.getMessage());
			assertEquals(ID, obj.getInt(RPCConst.TAG_ID));
			assertEquals(method, obj.getString(RPCConst.TAG_METHOD));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	public final void testSendRequest() {
		String method = RPCConst.CN_BACKEND_CLIENT + "." + EBEMethods.getOSInfo;
		JSONObject jsonParams = new JSONObject();
		try {
			jsonParams.put("test", "test");
			mController.sendRequest(method, jsonParams.toString());
			JSONObject obj = new JSONObject(mTcpStub.getMessage());
			assertEquals(method, obj.getString(RPCConst.TAG_METHOD));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	public final void testSendNotification() {
		String method = RPCConst.CN_BACKEND_CLIENT + "." + EBEMethods.getOSInfo;
		JSONObject jsonParams = new JSONObject();
		try {
			jsonParams.put("test", "test");
			mController.sendNotification(method, jsonParams.toString());
			JSONObject obj = new JSONObject(mTcpStub.getMessage());
			assertEquals(method, obj.getString(RPCConst.TAG_METHOD));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	public final void testClose() {
		mController.close();
		assertEquals(false, mTcpStub.isConnected());
	}

}