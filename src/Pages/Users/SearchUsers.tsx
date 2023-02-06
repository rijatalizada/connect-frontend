import React, { useEffect, useState } from "react";
import Loading from "../../Components/Base/Loading";
import UserItem from "../../Components/Users/UserItem";
import useFetch from "../../CustomHooks/useFetch";
import { IUser } from "../../Types";

const url = "https://localhost:44336/api/Users/GetUsers";

const SearchUsers = () => {
  const [users, loading, error] = useFetch(url);
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  

  useEffect(() => {
    if (search.trim() !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  if(loading){
    return <Loading />;
  }

  return (
    <section>
      <header className="h-[10rem] bg-[#00000024] flex items-center justify-center">
        <p
          className="text-[2rem] font-triscope
           "
        >
          Search users
        </p>
      </header>

      <main className="container mx-auto my-20">
        <div className="mb-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by username"
            className="border-2 border-solid border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="users-container mt-10 pt-3 border-t grid gap-4 grid-cols-4">
          {/* {search.length > 0
            ? users
                .filter((user: any) => user.userName.includes(search))
                .map((user: any) => <UserItem key={user.id} user={...user} />)
            : users.map((user: any) => (
                <UserItem key={user.id} user={...user} />
              ))} */}
          {isSearching
            ? users
                .filter((user: any) =>
                  user.userName
                    .toLowerCase()
                    .trim()
                    .includes(search.toLowerCase().trim())
                )
                .map((user: any) => {
                  return <UserItem key={user.id} {...user} />;
                })
            : users.map((user: any) => {
                return <UserItem key={user.id} {...user} />;
              })}
        </div>
      </main>
    </section>
  );
};

export default SearchUsers;
