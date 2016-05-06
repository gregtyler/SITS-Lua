-- Functions
print(W(STU.STU_NAME));

-- Chaining
local FOO = W(STU.STU_NAME);
local BAR = V(FOO);
local BAZ = U(BAR);
print(BAZ);

-- Profile
local GENDER = PROFILE('GEN', {GEN_CODE= STU.STU_GEND});
print(GENDER.GEN_NAME);

-- &G field
local TITLE = G('TTL', {TTL_CODE= STU.STU_TITL}, 'TTL_NAME');
print(TITLE);

print(G('TTL', {TTL_CODE= STU.STU_TITL}, 'TTL_NAME'));

-- Chaining &G
local FEE_STATUS = PROFILE('FST', {FST_CODE= STU.STU_FSTC});
local FEE_GROUP = PROFILE('FSG', {FSG_CODE= FEE_STATUS.FST_FSGC});

print(FEE_GROUP.FSG_NAME);