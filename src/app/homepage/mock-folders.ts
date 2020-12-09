import { Folder } from 'src/app/homepage/folder';
export function generating_folder(nums: number) {
  let index: number
  let hero: Folder;
  let heros: Folder[] = []
  for (index = 0; index < nums; index++) {
    hero =
    {
      names: "folder" + String(index),
      id: String(index)
    };
    heros.push(hero);
  }
  console.log(heros)
  return heros;
}