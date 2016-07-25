/*
 * Copyright (c) 2016, Ford Motor Company
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following
 * disclaimer in the documentation and/or other materials provided with the
 * distribution.
 *
 * Neither the name of the Ford Motor Company nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

#include <stdint.h>
#include <string>
#include <vector>

#include "gtest/gtest.h"
#include "utils/shared_ptr.h"
#include "smart_objects/smart_object.h"
#include "application_manager/smart_object_keys.h"
#include "commands/commands_test.h"
#include "commands/command_request_test.h"
#include "application_manager/application.h"
#include "application_manager/mock_application_manager.h"
#include "application_manager/event_engine/event.h"
#include "mobile/end_audio_pass_thru_request.h"
#include "interfaces/MOBILE_API.h"

namespace test {
namespace components {
namespace commands_test {
namespace mobile_commands_test {

using ::testing::_;
using ::testing::Return;
namespace am = ::application_manager;
using am::commands::MessageSharedPtr;
using am::commands::EndAudioPassThruRequest;
using am::event_engine::Event;
namespace mobile_result = mobile_apis::Result;

typedef SharedPtr<EndAudioPassThruRequest> EndAudioPassThruRequestPtr;

class EndAudioPassThruRequestTest
    : public CommandRequestTest<CommandsTestMocks::kIsNice> {};

TEST_F(EndAudioPassThruRequestTest, Run_SUCCESS) {
  EndAudioPassThruRequestPtr command(CreateCommand<EndAudioPassThruRequest>());

  EXPECT_CALL(app_mngr_,
              ManageHMICommand(
                  HMIResultCodeIs(hmi_apis::FunctionID::UI_EndAudioPassThru)));

  command->Run();
}

TEST_F(EndAudioPassThruRequestTest, OnEvent_UnknownEvent_UNSUCCESS) {
  EndAudioPassThruRequestPtr command(CreateCommand<EndAudioPassThruRequest>());

  Event event(hmi_apis::FunctionID::INVALID_ENUM);

  EXPECT_CALL(app_mngr_, ManageMobileCommand(_, _)).Times(0);

  command->on_event(event);
}

TEST_F(EndAudioPassThruRequestTest, OnEvent_SUCCESS) {
  const uint32_t kConnectionKey = 2u;

  MessageSharedPtr command_msg(CreateMessage(smart_objects::SmartType_Map));
  (*command_msg)[am::strings::params][am::strings::connection_key] =
      kConnectionKey;

  EndAudioPassThruRequestPtr command(
      CreateCommand<EndAudioPassThruRequest>(command_msg));

  MessageSharedPtr event_msg(CreateMessage(smart_objects::SmartType_Map));
  (*event_msg)[am::strings::msg_params] = 0;
  (*event_msg)[am::strings::params][am::hmi_response::code] =
      mobile_apis::Result::SUCCESS;

  Event event(hmi_apis::FunctionID::UI_EndAudioPassThru);
  event.set_smart_object(*event_msg);

  EXPECT_CALL(app_mngr_, EndAudioPassThrough()).WillOnce(Return(true));
  EXPECT_CALL(app_mngr_, StopAudioPassThru(kConnectionKey));

  EXPECT_CALL(
      app_mngr_,
      ManageMobileCommand(MobileResultCodeIs(mobile_apis::Result::SUCCESS), _));

  command->on_event(event);
}

}  // namespace mobile_commands_test
}  // namespace commands_test
}  // namespace components
}  // namespace test